const User = require('../../models/userModel');
const errorController = require('../../utils/errorController');
const { isCorrectPassword, createSendToken } = require('../../utils/utils');

const updatePassword = async (req, res) => {
  try {
    const { userId } = req.user;
    const user = await User.findById(userId).select('+password');
    if (!(await isCorrectPassword(req.body.passwordCurrent, user.password))) {
      throw new Error('current_password_wrong');
    }
    user.password = req.body.password;
    user.passwordChangedAt = Date.now() - 1000;
    await user.save();

    createSendToken(user, 200, res);
  } catch (error) {
    return errorController(error, res);
  }
};

module.exports = updatePassword;
