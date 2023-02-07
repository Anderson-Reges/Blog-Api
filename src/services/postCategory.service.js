const { PostCategory } = require('../models');

const createNewPostCategory = async (categories) => {
  const result = await PostCategory.create(categories);

  return result;
};

module.exports = {
  createNewPostCategory,
};