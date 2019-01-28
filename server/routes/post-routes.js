const express = require('express');
const db = require('../models');

const router = new express.Router();

router.get('/post', (req, res) => {console.log('step 1')
        db.Post
          .find({})
          .then(function(data) {
            
            res.json(data);
          })
          .catch(function(err) {
            res.json(err);
          });
});

router.get('/search/:chosen', function(req, res) {
  var choosen = String(req.params.chosen);
  let dataArray = {news:[]};
  db.News.find({}).then(function(data, err) {
        if (err) res.json(err);
        else{
          data.forEach(e => {
            e.title.toLowerCase().includes(choosen.toLowerCase())
              ? dataArray.news.push(e)
              : e.subtitle.toLowerCase().includes(choosen.toLowerCase())
                ? dataArray.news.push(e): 0;
          });
          res.json(dataArray);
        } 
      });
  });


module.exports = router;