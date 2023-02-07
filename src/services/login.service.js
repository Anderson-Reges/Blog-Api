const { User } = require('../models');

const getUser = async (email, password) => {
  const result = await User.findOne({
    where: { email, password },
  });

  return result;
};

module.exports = {
  getUser,
};