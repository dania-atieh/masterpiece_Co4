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
      throw new Error('You are not logged in! Please login to get access.');
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedToken) {
      throw new Error('You are not logged in! Please login to get access.');
    }

    const currentUser = await User.findById(decodedToken.userId);
    if (!currentUser) {
      throw new Error('The user belonging to this token is no longer exists');
    }

    if(decodedToken.role !== currentUser.role){
      throw new Error('Privilege has changed');
    }

    if (changedPasswordAfter(decodedToken.iat, currentUser.passwordChangedAt)) {
      throw new Error('User recently changed password! Please log in again.');
    }

    req.user = {
      userId: currentUser._id,
      role: currentUser.role
    };

    next();
  } catch (error) {
    return AppError(res, error.message ?? 'something went wrong', 401);
  }
};

module.exports = authenticator;
