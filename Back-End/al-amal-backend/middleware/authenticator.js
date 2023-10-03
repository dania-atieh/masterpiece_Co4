const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/appError');
const { changedPasswordAfter } = require('../utils/utils');

const authenticator = async (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization?.split(' ')[1];
    }

    if (!token) {
      throw new Error('not_logged');
    }
    // VERIFY TOKEN
    //If all checks are successful, it returns the payload of the JWT (the data contained in the token).
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedToken) {
      throw new Error('not_logged');
    }
    //GET USER FROM DATABASE
    const currentUser = await User.findById(decodedToken.userId);
    if (!currentUser) {
      throw new Error('user_not_exist');
    }

    // This is a security measure to ensure that users are not trying to access resources they are not authorized to access.
    if (decodedToken.role !== currentUser.role) {
      throw new Error('privilege_changed');
    }
    //CHECK PASSWORD DIDN'T CHANGE
    if (changedPasswordAfter(decodedToken.iat, currentUser.passwordChangedAt)) {
      throw new Error('user_changed_password');
    }
    //GIVE REQUEST OBJECT
    req.user = {
      userId: currentUser._id,
      role: currentUser.role
    };

    next();
  } catch (error) {
    return AppError(res, error.message, 401);
  }
};

module.exports = authenticator;


//  throw statement allows you to create a custom error.