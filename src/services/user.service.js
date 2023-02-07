const { User } = require('../models');

const createUser = async (newUser) => {
  const result = await User.create(newUser);

  return result;
};

const getUserWithEmail = async (email) => {
  const result = await User.findAll({
    where: { email },
  });

  return result;
};

const getAllUsers = async () => {
  const result = await User.findAll({
    attributes: { exclude: ['password'] },
  });

  return result;
};

const getUserById = async (id) => {
  const result = await User.findOne({
    where: { id },
    attributes: { exclude: ['password'] },
  });

  return result;
};

const deleteUser = async (id) => {
  const result = await User.destroy({
    where: { id },
  });

  return result;
};

module.exports = {
  createUser,
  getUserWithEmail,
  getAllUsers,
  getUserById,
  deleteUser,
};