const express = require('express');
const validator = require('../middlewares/validator');
const userSchema = require('../validations/userSchema');
const categoryController = require('../controllers/categoryController');
const {
  createCategory,
  updateCategory,
} = require('../validations/categorySchema');

const router = express.Router();

router.get('/', categoryController.getCategory);

router.post('/', validator(createCategory), categoryController.createCategory);

router.delete('/:id', categoryController.deleteCategory);

router.patch(
  '/:id',
  validator(updateCategory),
  categoryController.updateCategory,
);

module.exports = router;
