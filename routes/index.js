var express = require('express');
const Users = require('../models/Users');
var router = express.Router();


router.get('/', (req, res, next) =>{
  Users.findOne({email: req.body.email}, (err, user) => {
    if (err) throw err;
    if (!user) {
      return res.status(401).json({ message: "Authentication failed :(" });
    } else {
      res.json({'email': req.body.email});
    }
  })
});

module.exports = router;
