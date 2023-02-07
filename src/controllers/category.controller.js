const { createCategory, getAllCategories } = require('../services/category.service');

const createCategoryControl = async (req, res) => {
  try {
    const result = await createCategory(req.body);
    return res.status(201).json(result);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getAllCategoriesControl = async (_req, res) => {
  try {
    const result = await getAllCategories();
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createCategoryControl,
  getAllCategoriesControl,
};