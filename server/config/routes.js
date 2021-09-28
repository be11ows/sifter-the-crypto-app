const axios = require('axios');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (app) => {

  app.get('/list', (req, res) => {
    console.log('this is /list')

    // var config = {
    //     method: 'get',
    //     url: 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true',
    //     headers: { 
    //         'Content-Type': 'application/json'
    //     },
    // };
      
    // axios(config)
    // .then(response => res.send(response.data))
    // .catch(function (error) {
    //     console.log(error);
    // });
  })

  app.post('/register', (req, res, next) => {
    let { email, username, password } = req.body;
    
    bcrypt.hash(password, +process.env.SALTROUNDS, function(err, hash) {
      console.log('hash is ', hash)
      
      password = hash;
  
      User.create({ email, username, password })
      .then((createdUser) => {
        console.log('this is the created user', createdUser);
  
        console.log(createdUser.password);
      })
      .catch((err) => console.log(err))
    });

  })
}