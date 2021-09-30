const axios = require('axios');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('../utils/auth');
const { check, validationResult } = require('express-validator');

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

  app.post('/register', async (req, res, next) => {
    let { email, username, password } = req.body;
    
    await bcrypt.hash(password, +process.env.SALTROUNDS, function(err, hash) {
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

  app.post('/login', auth, async (req, res) => {
    let {username, password } = req.body;

    // let errors = validationResult(req);
    // console.log('THese IS errors ', errors)
    // if (!errors.isEmpty()) {
    //   res.send(errors); 
    // }

    console.log('username is ', username, 'and password is ', password)
    let userData = await User.findOne({ username: username });
    console.log('userData is ', userData);
    let userId = userData._id;
    let userPass = userData.password
    
    bcrypt.compare(password, userData.password)
    .then((result) => {
      console.log('result is ', result)
      if(result) {
        let payload = ({ userId, userPass });
        let options = { expiresIn: '1hr' };

        let token = jwt.sign(payload, process.env.SECRET, options);
        let loggedIn;

        res.send({ token, loggedIn });
        
        console.log('THIS IS TOKEN', token)
      }
    })
  })

}