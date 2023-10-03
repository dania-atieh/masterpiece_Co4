const AppError = require('./appError');

const handleDuplicateFieldsDB = (res, err) => {//extracts the value causing the duplication from the error message (err.errmsg)
  const value = err?.errmsg?.match(/(["'])(\\?.)*?\1/)?.[0] || '';
  return AppError(res, 'duplicate_field', 400, value);
};

const handleCastErrorDB = (res, err) => {
  const message = `Invalid ${err?.path}: ${err?.value}.`;
  return AppError(res, message, 400);
};

const handleValidationErrorDB = (res, err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  // const message = `Invalid input. ${errors.join('. ')}`;
  return AppError(res, errors, 400);
};

const handleJWTError = (res) => AppError(res, 'invalid_token', 401);

const handleJWTExpiredError = (res) => AppError(res, 'expired_token', 401);

const errorController = (error, res) => {
  if (error.name === 'CastError') {//invalid data type conversion
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
  return AppError(res, error?.message, 404);
};

module.exports = errorController;
