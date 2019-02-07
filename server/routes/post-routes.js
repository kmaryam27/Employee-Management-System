const express = require('express');
const db = require('../models');
const path = require('path');
const router = new express.Router();
/**
 * @description get all post from DB to show in home page
 */
router.get('/post', (req, res) => {
  db.Post.find({})
    .then(function(data) {
      res.json(data);
    })
    .catch(function(err) {
      res.json(err);
    });
});

/**
 * @description return selected image
 */
router.get('/getImage/:id', (req, res, next) => {
  res.sendFile(path.join(__dirname, `../public/${req.params.id}`));
});

/**
 * @description search selected file no need yet
 */
router.get('/search/:chosen', function(req, res) {
  const chosen = String(req.params.chosen);
  let dataArray = {posts:[]};
  db.Post.find({}).then(function(data, err) {
        if (err) res.json(err);
        else{
          data.forEach(e => {
            e.title.toLowerCase().includes(chosen.toLowerCase())
              ? dataArray.posts.push(e)
              : e.subtitle.toLowerCase().includes(chosen.toLowerCase())
                ? dataArray.posts.push(e): 0;
          });
          res.json(dataArray);
        } 
      });
  });


module.exports = router;