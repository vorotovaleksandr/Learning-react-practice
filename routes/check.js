const passport = require('../middleware/passport');
const express = require('express');
const router = express.Router()
//http://localhost:5000/checkToken
router.get('/', passport, function(req, res) {
    res.sendStatus(200);
  });
  module.exports = router