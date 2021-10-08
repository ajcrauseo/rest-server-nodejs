const { Router } = require('express');
const { check } = require('express-validator');

const { login } = require('../controllers/auth');
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

module.exports = router;
