const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../utils/errors/unauthorized-error');
const { secretKey } = require('../utils/env-config');
const { errorTexts } = require('../utils/constants');

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') next();
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, secretKey);
  } catch (err) {
    next(new UnauthorizedError(errorTexts.unAuthorizedToken));
  }
  req.user = payload;
  next();
};
