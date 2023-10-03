const User = require('../../../models/userModel');
const AppError = require('../../../utils/appError');
const errorController = require('../../../utils/errorController');
const { isCorrectPassword, createSendToken } = require('../../../utils/utils');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return AppError(res, 'provide_credential', 400);
    }
    //find the first document that matches 
    //password is hidden from query results for security reasons, should be included in the result.
    const user = await User.findOne({ email, role: { $in: ['admin', 'superAdmin'] } }).select(
      '+password'
    );
    if (!user || !(await isCorrectPassword(password, user.password))) {
      return AppError(res, 'incorrect_credential', 401);
    }
    createSendToken(user, 200, res);
  } catch (error) {
    errorController(error, res);
  }
};

module.exports = login;
