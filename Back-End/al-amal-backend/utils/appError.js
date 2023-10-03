const AppError = (res, message, statusCode, errorValue) => {
  return res.status(statusCode).json({
    status: `${statusCode}`.startsWith('4') ? 'fail' : 'error',
    message: message ?? 'went_wrong',
    errorValue
  });
};

module.exports = AppError;

// errorValue is optional

//simplify error handling by providing a consistent way to format and send error responses. It allows for flexibility in customizing error messages and including additional error-related data when needed. 

//making error handling more organized and standardized across the application.