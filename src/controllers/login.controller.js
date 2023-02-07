const jwt = require('jsonwebtoken');
const { getUser } = require('../services/login.service');

const { JWT_SECRET } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;

  const result = await getUser(email, password);
  
  if (!result) return res.status(400).json({ message: 'Invalid fields' });

  const payload = {
    id: result.dataValues.id,
    email,
  };

  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: '7d',
  });

  return res.status(200).json({ token });
};

module.exports = {
  login,
};