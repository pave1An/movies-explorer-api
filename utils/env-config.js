const { jwtSecretKeyDev, dataBaseHostDev } = require('./constants');

const isProduction = process.env.NODE_ENV === 'production';

const secretKey = isProduction ? process.env.JWT_SECRET : jwtSecretKeyDev;
const dataBaseURL = isProduction ? process.env.DB_URL : dataBaseHostDev;

module.exports = {
  dataBaseURL,
  secretKey,
};
