const { asyncMiddleware } = require('../middlewares/asyncMiddleware');
const Category = require('../models/mysql/Category');

const createCategory = asyncMiddleware(async (req, res, next) => {
  const { name, slug } = req.body;

  await Category.create({
    name,
    slug,
  });

  res.status(201).json({
    success: true,
  });
});

const getCategory = asyncMiddleware(async (req, res, next) => {
  const categories = await Category.findAll();

  res.status(200).json({
    success: true,
    data: categories,
  });
});

const deleteCategory = asyncMiddleware(async (req, res, next) => {
  const { id } = req.params;

  await Category.destroy({
    where: {
      id,
    },
  });

  res.status(200).json({
    success: true,
    message: 'Delete category successfully',
  });
});

const updateCategory = asyncMiddleware(async (req, res, next) => {
  const { id } = req.params;

  const { name, slug } = req.body;

  await Category.update(
    {
      name,
      slug,
    },
    {
      where: {
        id,
      },
    },
  );

  res.status(200).json({
    success: true,
    message: 'Update category successfully',
  });
});

module.exports = {
  createCategory,
  getCategory,
  deleteCategory,
  updateCategory,
};
