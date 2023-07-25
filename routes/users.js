const router = require('express').Router();
const { celebrate } = require('celebrate');
const {
  patchUser,
  getUserInfo,
} = require('../controllers/users');
const { userUpdateSchema } = require('../utils/joi-schemas');

router.get('/me', getUserInfo);
router.patch('/me', celebrate({ body: userUpdateSchema }), patchUser);

module.exports = router;
