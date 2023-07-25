const router = require('express').Router();
const { celebrate } = require('celebrate');
const userRoutes = require('./users');
const movieRoutes = require('./movies');
const auth = require('../middlewares/auth');
const { login, createUser, logout } = require('../controllers/users');
const { userSchema, loginSchema } = require('../utils/joi-schemas');
const NotFoundError = require('../utils/errors/not-found-error');
const { errorTexts } = require('../utils/constants');

router.post('/signup', celebrate({ body: userSchema }), createUser);
router.post('/signin', celebrate({ body: loginSchema }), login);
router.use(auth);
router.post('/signout', logout);
router.use('/users', userRoutes);
router.use('/movies', movieRoutes);
router.use('*', (req, res, next) => next(new NotFoundError(errorTexts.notFoundDefault)));

module.exports = router;
