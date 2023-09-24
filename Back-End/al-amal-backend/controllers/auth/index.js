const getMe = require('./get-me');
const updateMe = require('./update-me');
const deleteMe = require('./delete-me');
const updatePassword = require('./update-my-password');
const forgotPassword = require('./forgot-password');
const resetPassword = require('./reset-password');

module.exports = {
  getMe,
  updateMe,
  updatePassword,
  deleteMe,
  forgotPassword,
  resetPassword
};
