const AppError = (res, message, statusCode) => {
  return res.status(statusCode).json({
    status: `${statusCode}`.startsWith("4") ? "fail" : "error",
    message,
  });
};

module.exports = AppError;
