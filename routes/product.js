const express = require('express');
const validator = require('../middlewares/validator');
const userSchema = require('../validations/userSchema');
const productController = require('../controllers/productController');
const jwtAuth = require('../middlewares/jwtAuth');
const { authorize } = require('../middlewares/authorize');
const upload = require('../middlewares/upload');
const mongoUpload = require('../middlewares/mongoUpload');

const router = express.Router();

router.get('/', productController.getProduct);

router.post(
  '/',
  jwtAuth,
  authorize('owner'),
  mongoUpload.single('photo'),
  productController.createProduct,
);

router.delete(
  '/:id',
  jwtAuth,
  authorize('owner'),
  productController.deleteProduct,
);

router.patch(
  '/:id',
  jwtAuth,
  authorize('owner'),
  productController.updateProduct,
);

module.exports = router;
