const express = require('express');
const db = require('../models');
const path = require('path');
const router = new express.Router();

router.get('/post', (req, res) => {
        db.Post
          .find({})
          .then(function(data) {
            
            res.json(data);
          })
          .catch(function(err) {
            res.json(err);
          });
});

router.get('/getImage/:id', (req, res, next) => {
  console.log(req.params.id);
  res.sendFile(path.join(__dirname, `../public/${req.params.id}.png`));
});

router.get('/search/:chosen', function(req, res) {
  var chosen = String(req.params.chosen);
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