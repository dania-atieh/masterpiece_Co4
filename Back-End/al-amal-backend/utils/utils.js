/* eslint-disable no-useless-escape */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//variable number of arguments 
const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

//compare the candidate password (plaintext) with the hashed user password.
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
  message: 'password_check' //error message
};

const phoneValidator = {
  validator: function (value) {
    if (value === '') return true;  //indicating that the validation passes. 
    return /^[0-9]{10}$/.test(value) && value.startsWith('07');
  },
  message: 'phone_check' //error message
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

// this function is designed to determine whether a user with a specific role is allowed to perform a certain type of action (specified by the type parameter) and, if not, it provides a corresponding error message indicating the restriction reason.
const restrictTo = (role, type) => {
  let message = '';
  if (type == 'users' && role !== 'user') {
    //don't match
    message = 'user_permission';
    // error message indicating why the permission is restricted.
  }
  if (type == 'admins' && !['admin', 'superAdmin'].includes(role)) {
    message = 'admin_permission';
  }
  if (type == 'superAdmin' && role !== 'superAdmin') {
    message = 'superadmin_permission';
  }
  return message;
  //returns empty string if no restriction is applied.
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
