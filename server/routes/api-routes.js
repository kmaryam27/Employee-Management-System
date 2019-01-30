const express = require('express');

const router = new express.Router();
const validator = require('validator');
const passport = require('passport');
const db = require('../models')


function validateSignupForm(payload) {
  const errors = {};
  let isFormValid = true;
  let message = '';

  if (!payload || typeof payload.email !== 'string' || !validator.isEmail(payload.email)) {
    isFormValid = false;
    errors.email = 'Please provide a correct email address.';
  }

  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length < 8) {
    isFormValid = false;
    errors.password = 'Password must have at least 8 characters.';
  }

  if (!payload || typeof payload.name !== 'string' || payload.name.trim().length === 0) {
    isFormValid = false;
    errors.name = 'Please provide your name.';
  }

  if (!isFormValid) {
    message = 'Check the form for errors.';
  }

  return {
    success: isFormValid,
    message,
    errors
  };
}


/**
 * @description user values passed through from auth middleware
 */
router.get('/dashboard', (req, res) => {
  items={posts: [], members: []}
  db.Post.find({}).then((data) => {
     items.posts = data;
     if(req.user.access === 1){
      db.User.find({}).then((members) => {
        items.members = members; 

        res.status(200).json({
          message: "You're authorized to see this secret message.",
          user: req.user,
          items: items
        });

      }).catch(function(err) {
        res.json(items);
      });
     }
    })
    .catch(function(err) {
      res.json(err);
    });
});

/**
 * @description user signup
 */
router.post('/signup', (req, res, next) => {
  const validationResult = validateSignupForm(req.body);
  console.log(req.body)
  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    });
  }


  return passport.authenticate('local-signup', (err,...b) => {
    if (err) {
      
      if (err.name === 'MongoError' && err.code === 11000) {
        // the 11000 Mongo code is for a duplication email error
        // the 409 HTTP status code is for conflict error
        return res.status(409).json({
          success: false,
          message: 'Check the form for errors.',
          errors: {
            email: 'This email is already taken.'
          }
        });
      }
      
      return res.status(400).json({
        success: false,
        message: 'Could not process the form.'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'You have successfully signed up! Now you should be able to log in.'
    });
  })(req, res, next);
});


router.post("/addPost", (req, res) => {
  const userId = req.body.userId;
  const post = {
    title: req.body.title,
    subtitle: req.body.subtitle,
    imageAddress: req.body.imageAddress,
    context: req.body.context
  }
  db.Post.create(post)
  .then(function(data) {console.log(data._id)
     return db.User.findOneAndUpdate({_id: userId}, { $push: { post: data._id } }, { new: true });
  })
  .then(function(result) {
    res.json(result);
  })
  .catch(function(err) {
    res.json(err);
  });
});



router.get('/search/:chosen', function(req, res) {

  let chosen = String(req.params.chosen).toLowerCase();
  let dataArray = {users: [], news:[]};
 

      db.News.find({}).then(function(data, err) {
        if (err) res.json(err);
        else{
          if(data.length > 0)
          data.forEach(e => {
            console.log(e.title);
            console.log(chosen)
            e.title.toLowerCase().includes(chosen)
              ? dataArray.news.push(e)
              : e.subtitle.toLowerCase().includes(chosen)
                ? dataArray.news.push(e): 0;
          });
          // if(req.user.access !== 1)
          res.json(dataArray);
          // else{
          //   db.User.find({}).then(function(data, err) {
          //     if (err) res.json(dataArray);
          //     else{
          //       data.forEach(e => {
          //         e.name.toLowerCase().includes(choosen.toLowerCase())
          //           ? dataArray.users.push(e)
          //           : e.email.toLowerCase().includes(choosen.toLowerCase())
          //             ? dataArray.users.push(e): 0;
          //       });
          //     }
          //   });
          // }
        }
      }).catch(err => {
        console.log(err);
      });
    });



module.exports = router;