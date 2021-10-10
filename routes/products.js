const { Router } = require('express');
const { check } = require('express-validator');

const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/products');

const { productIdExists } = require('../helpers/db-validators');

const {
  fieldsValidator,
  JWTValidator,
  isAdminRole,
} = require('../middlewares');

const router = Router();

router.get('/', getProducts);

router.get(
  '/:id',
  [
    check('id', 'ID is not valid').isMongoId(),
    check('id').custom(productIdExists),
    fieldsValidator,
  ],
  getProductById,
);

// Crear Producto - Requiere autenticacion
router.post(
  '/',
  [
    JWTValidator,
    check('name', 'Name is required').notEmpty(),
    check('category', 'Category is required').notEmpty(),
    fieldsValidator,
  ],
  createProduct,
);

router.put(
  '/:id',
  [
    check('id', 'ID is not valid').isMongoId(),
    check('id').custom(productIdExists),
    fieldsValidator,
  ],
  updateProduct,
);
router.delete(
  '/:id',
  [
    check('id', 'ID is not valid').isMongoId(),
    check('id').custom(productIdExists),
    fieldsValidator,
  ],
  deleteProduct,
);

module.exports = router;
