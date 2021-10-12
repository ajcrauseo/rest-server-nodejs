const { Router } = require('express');
const { check } = require('express-validator');

const { fieldsValidator, uploadFileValidator } = require('../middlewares');
const {
  uploadFile,
  // updateImg,
  showImage,
  updateImgCloudinary,
} = require('../controllers/uploads');
const { allowedCollections } = require('../helpers');

const router = Router();

router.post('/', uploadFileValidator, uploadFile);

router.put(
  '/:collection/:id',
  [
    uploadFileValidator,
    check('id', 'ID is not valid').isMongoId(),
    check('collection').custom((c) =>
      allowedCollections(c, ['users', 'products']),
    ),
    fieldsValidator,
  ],
  // updateImg,
  updateImgCloudinary,
);

router.get(
  '/:collection/:id',
  [
    check('id', 'ID is not valid').isMongoId(),
    check('collection').custom((c) =>
      allowedCollections(c, ['users', 'products']),
    ),
    fieldsValidator,
  ],
  showImage,
);

module.exports = router;
