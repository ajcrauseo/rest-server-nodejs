const { Router } = require('express');
const { check } = require('express-validator');

const { login, googleAuth } = require('../controllers/auth');
const { fieldsValidator } = require('../middlewares');


const router = Router();

router.post(
  '/login',
  [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').notEmpty(),
    fieldsValidator,
  ],
  login,
);

router.post(
  '/google-auth',
  [
    check('id_token', 'id_token is required').notEmpty(),
    fieldsValidator,
  ],
  googleAuth,
);

module.exports = router;
