/* eslint-disable no-useless-escape */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

const isCorrectPassword = async (candidatePassword, userPassword) => {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const passwordValidator = {
  validator: function (value) {
    return (
      /[a-z]/.test(value) && // At least one lowercase letter
      /[A-Z]/.test(value) && // At least one uppercase letter
      /\d/.test(value) && // At least one digit
      /[!%@\*()#^$?,;]/.test(value) && // At least one special character
      value.length >= 8 // At least 8 characters
    );
  },
  message:
    'Password must contain at least one uppercase letter, one lowercase letter, one digit, one special character, and be at least 8 characters long.'
};

const phoneValidator = {
  validator: function (value) {
    if (value === '') return true;
    return /^[0-9]{10}$/.test(value) && value.startsWith('07');
  },
  message:
    'Phone number must contain only numbers, have a length of 10 characters, and start with "07" or be an empty string.'
};

const changedPasswordAfter = (JWTTimestamp, passwordChangedAt) => {
  if (passwordChangedAt) {
    const changedTimestamp = parseInt(passwordChangedAt.getTime() / 1000, 10);
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

const signToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken({ userId: user._id, role: user.role });
  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user
    }
  });
};

const restrictTo = (role, type) => {
  let message = '';
  if (type == 'users' && role !== 'user') {
    message = 'You do not have user permission to perform this action';
  }
  if (type == 'admins' && !['admin', 'superAdmin'].includes(role)) {
    message = 'Access denied. You must be an admin to access this route.';
  }
  if (type == 'superAdmin' && role !== 'superAdmin') {
    message = 'You do not have superAdmin permission to perform this action';
  }
  return message;
};

function handleJsonParsingError(err, req, res, next) {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ error: 'Invalid JSON data' });
  }
  next(err);
}

module.exports = {
  filterObj,
  isCorrectPassword,
  passwordValidator,
  changedPasswordAfter,
  createSendToken,
  restrictTo,
  phoneValidator,
  handleJsonParsingError
};
