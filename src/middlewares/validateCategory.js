const Joi = require('joi');

const validateCategoryValue = (req, res, next) => {
  const { error } = Joi.object({
    name: Joi.string().required().messages({
      'string.required': '"name" is required',
    }),
  }).validate(req.body);

  if (error) return res.status(400).json({ message: error.message });

  next();
};

module.exports = {
  validateCategoryValue,
};