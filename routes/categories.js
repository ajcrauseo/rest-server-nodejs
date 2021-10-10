const { Router } = require('express');
const { check } = require('express-validator');

const {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} = require('../controllers/categories');

const { categoryIdExists } = require('../helpers/db-validators');

const {
  fieldsValidator,
  JWTValidator,
  isAdminRole,
} = require('../middlewares');

const router = Router();

// Obtener todas las categorias - Ruta pública
router.get('/', getCategories);

// Obtener una categoria por ID - Ruta pública
router.get(
  '/:id',
  [
    check('id', 'ID is not valid').isMongoId(),
    check('id').custom(categoryIdExists),
    fieldsValidator,
  ],
  getCategoryById,
);

// Crear una nueva categoria - Ruta privada - Cualquier persona autenticada
router.post(
  '/',
  [
    JWTValidator,
    check('name', 'Name is required').notEmpty(),
    fieldsValidator,
  ],
  createCategory,
);

// Actualizar un registro por ID - Ruta privada - Cualquier persona autenticada
router.put(
  '/:id',
  [
    JWTValidator,
    check('id', 'ID is not valid').isMongoId(),
    check('id').custom(categoryIdExists),
    check('name', 'Name is required').notEmpty(),
    fieldsValidator,
  ],
  updateCategory,
);

// Borrar una categoria - Ruta privada - Solo con ADMIN_ROLE
router.delete(
  '/:id',
  [
    JWTValidator,
    isAdminRole,
    check('id', 'ID is not valid').isMongoId(),
    check('id').custom(categoryIdExists),
    fieldsValidator,
  ],
  deleteCategory,
);

module.exports = router;
