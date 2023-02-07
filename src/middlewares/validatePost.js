const Joi = require('joi');
const { getCategoryById } = require('../services/category.service');
const { getPostById } = require('../services/blogPost.service');

const validatePostValues = async (req, res, next) => {
  const { error } = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    categoryIds: Joi.array().items().required(),
  }).validate(req.body);

  if (error) return res.status(400).json({ message: 'Some required fields are missing' });

  next();
};

const validateCategories = async (req, res, next) => {
  const { categoryIds } = req.body;

  const ifExistCategory = await Promise.all(
    categoryIds.map(async (categorie) => {
    const category = await getCategoryById(categorie);
    if (category) {
      return true;
    } 
      return false;
  }),
  );

  const ifExistFalse = ifExistCategory.some((boolean) => boolean === false);
  
  if (ifExistFalse) {
    return res.status(400).json({ message: 'one or more "categoryIds" not found' });
  }

  next();
};

const validateIfExistPostId = async (req, res, next) => {
  const { id } = req.params;

  const ifExist = await getPostById(id);

  if (!ifExist) return res.status(404).json({ message: 'Post does not exist' });

  next();
};

const validateUpdatedPostValues = async (req, res, next) => {
  const { error } = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
  }).validate(req.body);

  if (error) return res.status(400).json({ message: 'Some required fields are missing' });

  next();
};

module.exports = {
  validatePostValues,
  validateCategories,
  validateIfExistPostId,
  validateUpdatedPostValues,
};