const jwt = require('jsonwebtoken');
require('dotenv/config');
const {
  createUser, getUserWithEmail,
  getAllUsers, getUserById,
  deleteUser } = require('../services/user.service');

const { JWT_SECRET } = process.env;

const createNewUser = async (req, res) => {
  const { displayName, email, image } = req.body;

  const ifExistEmail = await getUserWithEmail(email);

  if (ifExistEmail.length !== 0) {
    return res.status(409).json({ message: 'User already registered' });
  }

  await createUser(req.body);

  const payload = {
    displayName,
    email,
    image,
  };

  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: '7d',
  });

  return res.status(201).json({ token });
};

const getAllUsersCont = async (_req, res) => {
  const allUsers = await getAllUsers();

  return res.status(200).json(allUsers);
};

const getUserByIdCont = async (req, res) => {
  const { id } = req.params;
  const result = await getUserById(id);

  if (!result) return res.status(404).json({ message: 'User does not exist' });

  return res.status(200).json(result);
};

const deleteUserControl = async (req, res) => {
  const token = req.header('Authorization');
  const loggedUser = req.user;

  const decoded = jwt.verify(token, JWT_SECRET);

  if (decoded.email !== loggedUser.email) {
    return res.status(500).json({ message: 'delete denied' });
  }
  await deleteUser(decoded.id);
  return res.status(204).json();
};

module.exports = {
  createNewUser,
  getAllUsersCont,
  getUserByIdCont,
  deleteUserControl,
};