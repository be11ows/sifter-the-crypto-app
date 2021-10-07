const axios = require('axios');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('../utils/auth');
const { check, validationResult } = require('express-validator');

require('dotenv').config();

module.exports = (app) => {

  app.get('/list', (req, res) => {
    console.log('inside app.get("/list"')
  })

  app.post('/curatedList', (req, res) => { 

    const body = req.body;
    const token = body.token;
    const decoded = jwt.verify(token, process.env.SECRET);
    const userId = decoded.userId;

 
    // post to the backend with a delete object sent back
    if(body.delete) {

      User.findById(userId, (err, user) => {
        if(err) return console.error(err);
        
        let coinArray = user.userCoins;
        let removeAtPosition;

        coinArray.forEach( (coin, index) => {
          for (let key in coin) {
            if (key == body.coinId) {
              removeAtPosition = index;
            }
          }
        });

        coinArray.splice(removeAtPosition, 1);

        user.save((err, result) => {
          if (err) return console.error(err);
          result = result.userCoins;
          res.send({result, msg: `${body.coinId} has been sifted out of your list.`})
        });
      });

    // post to the backend with onPageLoad set to true
    } else if (body.onPageLoad) {

      User.findById(userId, (err, user) => {
        if(err) return console.error(err);
        console.log('THIS IS THE RETURNED USER ', user)
        const coins = user.userCoins;
        res.send( coins );
      })

      
    } else if (body.saveAmount) {

      User.findById(userId, (err, user) => {
        if(err) return console.error(err);
        
        let coinId = body.id;
        let newAmount = Number(body.amount);
        let coinArray = user.userCoins;
        
        let splicePosition;
        let newCoin;

        if(coinId) {
          coinArray.forEach((coin, index) => {
            for(let key in coin) {
              if(key == body.id) {
                splicePosition = index;
                console.log('splicePosition is ', splicePosition);
              }
            }
          });
  
          if(req.body.id && newAmount){
            newCoin = {[req.body.id]: newAmount}
            console.log('newCoin is ', newCoin);
          };
  
          coinArray.splice(splicePosition, 1, newCoin)
          console.log('THIS IS THE COIN ARRAY ======> ', coinArray);
  
          user.save((err, result) => {
            if (err) return console.error(err);
            result = result.userCoins;
            res.send({result, msg: `Your list now has ${newAmount} ${[req.body.id]}`})
          })
        } else {
          res.send({errorMsg: 'Error.  Please try again.'})
        }
      })
      //console.log('inside saveAmount route!!')
      // let amountToUpdate = body.saveAmt;
      // console.log('amt to update is ', amountToUpdate)


    }
    
  })

  app.post('/list', (req, res) => {
    console.log('req.body is ', req.body)
    const coin = req.body;
    console.log('the coin is ', coin);

    const payload = jwt.verify(coin.user, process.env.SECRET);
    console.log('payload is ', payload);

    User.findById(payload.userId, (err, user) => {
      if (err) return console.error(err);

      const coinName = coin.id;
      console.log('this is the user ', user)
      const coinChecker = user.userCoins.filter( coin => coin.hasOwnProperty(coinName));

      console.log('coin checker arrary is ', coinChecker);

      if(coinChecker.length === 0) {
        user.userCoins.push({[coinName]: 0});
      }

      user.save((err, res) => {
        if (err) return console.error(err);
        console.log('updated user ', res);
      });
      res.send({msg: `${coinName} added to your list.`})
    })
  });

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

  app.post('/register', async (req, res, next) => {
    let { email, username, password, userCoins } = req.body;
    
    await bcrypt.hash(password, +process.env.SALTROUNDS, function(err, hash) {
           
      password = hash;
  
      User.create({ email, username, password, userCoins })
      .then((createdUser) => {
        console.log('this is the created user ', createdUser);
        res.send({createdUser})
      })
      .catch((err) => console.log(err))
    });
    
  })

}