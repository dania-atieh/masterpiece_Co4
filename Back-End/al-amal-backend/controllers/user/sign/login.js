const User = require('../../../models/userModel');
const errorController = require('../../../utils/errorController');
const { isCorrectPassword, createSendToken } = require('../../../utils/utils');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error('Please provide email and password!');
    }
    const user = await User.findOne({ email, role: 'user' }).select('+password');

    if (!user || !(await isCorrectPassword(password, user.password))) {
      throw new Error('Incorrect email or password');
    }

    createSendToken(user, 200, res);
  } catch (error) {
    errorController(error, res);
  }
};

module.exports = login;
