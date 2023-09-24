const AppError = require('./appError');

const handleDuplicateFieldsDB = (res, err) => {
  const value = err?.errmsg?.match(/(["'])(\\?.)*?\1/)?.[0] || '';
  const message = `Duplicate field value: ${value}. Please use another value!`;
  return AppError(res, message, 400);
};

const handleCastErrorDB = (res, err) => {
  const message = `Invalid ${err?.path}: ${err?.value}.`;
  return AppError(res, message, 400);
};

const handleValidationErrorDB = (res, err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join('. ')}`;
  return AppError(res, message, 400);
};

const handleJWTError = (res) => AppError(res, 'Invalid token. Please log in again!', 401);

const handleJWTExpiredError = (res) =>
  AppError(res, 'Your token has expired! Please log in again.', 401);

const errorController = (error, res) => {
  if (error.name === 'CastError') {
    return handleCastErrorDB(res, error);
  }
  if (error.code === 11000) {
    return handleDuplicateFieldsDB(res, error);
  }
  if (error.name === 'ValidationError') {
    return handleValidationErrorDB(res, error);
  }
  if (error.name === 'JsonWebTokenError') {
    return handleJWTError(res);
  }
  if (error.name === 'TokenExpiredError') {
    return handleJWTExpiredError(res);
  }
  return AppError(res, error?.message ?? 'something went wrong', 404);
};

module.exports = errorController;
