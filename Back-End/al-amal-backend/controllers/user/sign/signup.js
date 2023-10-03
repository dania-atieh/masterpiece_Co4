const User = require('../../../models/userModel');
const errorController = require('../../../utils/errorController');
const { createSendToken } = require('../../../utils/utils');

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = await User.create({
      name,
      email,
      password
    });
    createSendToken(newUser, 201, res);
  } catch (error) {
    errorController(error, res);
  }
};

module.exports = signup;
