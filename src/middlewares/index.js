const validateLogin = require('./validateLogin');
const validateNewUser = require('./validateNewUser');
const validateCategory = require('./validateCategory');
const validatePost = require('./validatePost');
const auth = require('./auth');

module.exports = {
  validateLogin,
  validateNewUser,
  validateCategory,
  validatePost,
  auth,
};