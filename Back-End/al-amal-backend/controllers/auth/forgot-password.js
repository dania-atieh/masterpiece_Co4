const User = require('../../models/userModel');
const sendEmail = require('../../utils/email');
const errorController = require('../../utils/errorController');

const forgotPassword = async (req, res) => {
  try {
    // 1) Get user based on POSTed email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      throw new Error('user_not_found');
    }
    // 2) Generate the random reset token
    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    // 3) Send it to user's email
    // const resetURL = `${req.protocol}://${req.get('host')}/api/v1/users/reset-password/${resetToken}`;

    try {
      await sendEmail({
        email: user.email,
        resetToken
      });
      return res.status(200).json({
        status: 'success',
        message: 'Token sent to email!'
      });
    } catch (error) {
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save({ validateBeforeSave: false });
      return errorController(error, res);
    }
  } catch (error) {
    return errorController(error, res);
  }
};

module.exports = forgotPassword;
