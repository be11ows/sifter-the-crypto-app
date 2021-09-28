require('dotenv').config();
const env = process.env.NODE_ENV || 'development';

const config = {
  development: {
    port: process.env.PORT || 9000,
    dbURL: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cryptotracker.u7zne.mongodb.net/sifterDB?retryWrites=true&w=majority`,
    authCookieName: 'x-auth-token'
  },
  production: {}
};

module.exports = config[env];