const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const NotFoundError = require('../utils/errors/not-found-error');
const UnauthorizedError = require('../utils/errors/unauthorized-error');
const { secretKey } = require('../utils/env-config');
const { errorTexts, cookieDeleteMessage } = require('../utils/constants');

const getUserInfo = (req, res, next) => {
  User.findOne({ _id: req.user })
    .then((user) => res.send(user))
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        name, email, password: hash,
      })
        .then((user) => res.status(201).send(user.deletePassword()))
        .catch(next);
    })
    .catch(next);
};

const patchUser = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    { new: true, runValidators: true },
  )
    .orFail(() => new NotFoundError(errorTexts.notFoundUser))
    .then((user) => res.send(user))
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .select('+password')
    .orFail(() => new UnauthorizedError())
    .then((user) => {
      bcrypt.compare(String(password), user.password)
        .then((isUserValid) => {
          if (isUserValid) {
            const token = jwt.sign({ _id: user._id }, secretKey);
            res.cookie('jwt', token, { maxAge: 3600000 * 24 * 7, httpOnly: true });
            res.send(user.deletePassword());
          } else {
            throw new UnauthorizedError();
          }
        })
        .catch(next);
    })
    .catch(next);
};

const logout = (req, res, next) => {
  try {
    res.clearCookie('jwt');
    res.send(cookieDeleteMessage);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getUserInfo,
  createUser,
  patchUser,
  login,
  logout,
};
