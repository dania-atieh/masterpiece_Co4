const User = require('../../../models/userModel');
const AppError = require('../../../utils/appError');
const errorController = require('../../../utils/errorController');
const { isCorrectPassword, createSendToken } = require('../../../utils/utils');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return AppError(res, 'Please provide email and password!', 400);
    }
    const user = await User.findOne({ email, role: { $in: ['admin', 'superAdmin'] } }).select(
      '+password'
    );
    if (!user || !(await isCorrectPassword(password, user.password))) {
      return AppError(res, 'Incorrect email or password', 401);
    }
    createSendToken(user, 200, res);
  } catch (error) {
    errorController(error, res);
  }
};

module.exports = login;
