const { Category } = require('../models');

const createCategory = async (category) => {
  const result = await Category.create(category);

  return {
    id: result.null,
    name: result.name, 
  };
};

const getAllCategories = async () => {
  const result = await Category.findAll();

  return result;
};

const getCategoryById = async (id) => {
  const result = await Category.findByPk(id);

  return result;
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
};