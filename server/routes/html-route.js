const express = require('express');

const router = new express.Router();

/**
 * @description user values passed through from auth middleware
 */
router.get('/', (req, res) => {
    res.status(200).json({
      message: "You're connected to port 3001",
    });
  });


  module.exports = router;