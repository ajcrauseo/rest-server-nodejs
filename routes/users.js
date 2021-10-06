const { Router } = require('express');
const { check } = require('express-validator');

const {
  getUsers,
  putUsers,
  postUsers,
  deleteUsers,
  patchUsers,
} = require('../controllers/users');
const {
  isRolValid,
  emailExists,
  idExists,
} = require('../helpers/db-validators');
const { fieldsValidator } = require('../middlewares/fieldsValidator');

const router = Router();

router.get('/', getUsers);

router.put(
  '/:id',
  [
    check('id', 'ID is not valid').isMongoId(),
    check('id').custom(idExists),
    check('rol', 'Rol is not valid').custom(isRolValid),
    fieldsValidator,
  ],
  putUsers,
);

router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is not valid').isEmail(),
    check('email').custom(emailExists),
    check(
      'password',
      'Password is required and must be more than 6 characters',
    ).isLength({ min: 6 }),
    check('rol', 'Rol is not valid').custom(isRolValid),
    fieldsValidator,
  ],
  postUsers,
);

router.patch('/', patchUsers);

router.delete(
  '/:id',
  [
    check('id', 'ID is not valid').isMongoId(),
    check('id').custom(idExists),
    fieldsValidator,
  ],
  deleteUsers,
);

module.exports = router;
