const { Op } = require('sequelize');
const { BlogPost, User, Category } = require('../models');

const createNewBlogPost = async (post) => {
  const result = await BlogPost.create(post);

  return result.null;
};

const getPostById = async (id) => {
  const result = await BlogPost.findByPk(id);

  return result;
};

const getAllPosts = async () => {
  const result = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  return result;
};

const getPostWithUserAndCategory = async (id) => {
  const result = await BlogPost.findOne({
    where: { id },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  return result;
};

const updateOnePost = async (id, title, content, updated) => {
  const [updatedPost] = await BlogPost.update(
    { title, content, updated },
    {
      where: { id },
      include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories', through: { attributes: [] } },
      ],
    },
  );

  return updatedPost;
};

const deletePost = async (id) => {
  const result = await BlogPost.destroy({
    where: { id },
  });

  return result;
};

const searchPost = async (query) => {
  const result = await BlogPost.findAll({
    where: {
      [Op.or]: [
        {
          title: { [Op.substring]: query },
        },
        {
          content: { [Op.substring]: query },
        },
      ],
    },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  return result;
};

module.exports = {
  createNewBlogPost,
  getPostById,
  getAllPosts,
  getPostWithUserAndCategory,
  updateOnePost,
  deletePost,
  searchPost,
};