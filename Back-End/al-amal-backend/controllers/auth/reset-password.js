const crypto = require('crypto');
const User = require('../../models/userModel');
const AppError = require('../../utils/appError');
const { createSendToken } = require('../../utils/utils');
const errorController = require('../../utils/errorController');

const resetPassword = async (req, res) => {
  try {
    const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() }
    });
    if (!user) {
      return AppError(res, 'token_exp_or_inv', 404);
    }
    user.password = req.body.password;
    user.passwordChangedAt = Date.now() - 1000;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    createSendToken(user, 200, res);
  } catch (error) {
    return errorController(error, res);
  }
};

module.exports = resetPassword;
