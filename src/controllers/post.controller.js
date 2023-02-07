const {
  createNewBlogPost, getPostById,
  getAllPosts, getPostWithUserAndCategory,
  updateOnePost, deletePost,
  searchPost } = require('../services/blogPost.service');
const { createNewPostCategory } = require('../services/postCategory.service');

const createPostControl = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { id } = req.user;
  const newPost = { title, content, userId: id, published: new Date() };

  const idPost = await createNewBlogPost(newPost);

  const newPostCategory = { postId: idPost, categoryId: 0 };

  categoryIds.forEach(async (category) => {
    newPostCategory.categoryId = category;
    await createNewPostCategory(newPostCategory);
  });

  const post = await getPostById(idPost);
  return res.status(201).json(post);
};

const getAllPostsControl = async (req, res) => {
  const result = await getAllPosts();

  return res.status(200).json(result);
};

const getPostWithUserAndCategoryControl = async (req, res) => {
  const { id } = req.params;
  const result = await getPostWithUserAndCategory(id);

  return res.status(200).json(result);
};

const updatePostControl = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  const ifAuthorized = await getPostWithUserAndCategory(id);

  if (ifAuthorized.userId !== req.user.id) {
    return res.status(401).json({ message: 'Unauthorized user' });
  }
  await updateOnePost(id, title, content, new Date());

  const result = await getPostWithUserAndCategory(id);

  return res.status(200).json(result);
};

const deletePostControl = async (req, res) => {
  const { id } = req.params;
  const ifAuthorized = await getPostWithUserAndCategory(id);

  if (!ifAuthorized) return res.status(404).json({ message: 'Post does not exist' });

  if (ifAuthorized.userId !== req.user.id) {
    return res.status(401).json({ message: 'Unauthorized user' });
  }

  await deletePost(id);

  return res.status(204).json();
};

const searchPostControl = async (req, res) => {
  const { q } = req.query;
  
  const allPosts = await getAllPosts();

  if (q === null) return res.status(200).json(allPosts);

  const result = await searchPost(q);

  return res.status(200).json(result);
};

module.exports = {
  createPostControl,
  getAllPostsControl,
  getPostWithUserAndCategoryControl,
  updatePostControl,
  deletePostControl,
  searchPostControl,
};