const { check, validationResult } = require('express-validator');
let User = require('../models/User');

let validationBodyRules = [

  check('username', 'Username Invalid')
  .trim()
  .isAlphanumeric()
  .isLength({ min: 6 })
  .custom((value, { req }) => {
    User.findOne({ username: value })
    .then(res => console.log('this is validation res ', res))
  })
];

module.exports = validationBodyRules;