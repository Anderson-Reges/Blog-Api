const Joi = require('joi');

const validateNewUserValues = (req, res, next) => {
  const { error } = Joi.object({
    displayName: Joi.string().min(8).required().messages({
      'string.max': '"displayName" length must be at least 8 characters long',
    }),
    email: Joi.string().email().required().messages({
      'string.email': '"email" must be a valid email',
    }),
    password: Joi.string().min(6).required().messages({
      'string.max': '"password" length must be at least 6 characters long',
    }),
    image: Joi.string(),
  }).validate(req.body);

  if (error) return res.status(400).json({ message: error.message });

  next();
};

module.exports = {
  validateNewUserValues,
};