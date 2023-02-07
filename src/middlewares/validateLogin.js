const Joi = require('joi');

const ifExistLoginValues = (req, res, next) => {
  const { error } = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }).validate(req.body);

  if (error) return res.status(400).json({ message: 'Some required fields are missing' });

  next();
};

module.exports = ifExistLoginValues;