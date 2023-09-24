const AppError = require('../utils/appError');
const { restrictTo } = require('../utils/utils');

function usersCheck(req, res, next) {
  try {
    const role = req.user?.role;
    let message = restrictTo(role, 'users');
    if (message) {
      throw new Error(message);
    }
    next();
  } catch (error) {
    return AppError(res, error.message ?? 'Access denied.', 403);
  }
}
function adminsCheck(req, res, next) {
  try {
    const role = req.user?.role;
    let message = restrictTo(role, 'admins');
    if (message) {
      throw new Error(message);
    }
    next();
  } catch (error) {
    return AppError(res, error.message ?? 'Access denied.', 403);
  }
}
function superAdminCheck(req, res, next) {
  try {
    const role = req.user?.role;
    let message = restrictTo(role, 'superAdmin');
    if (message) {
      throw new Error(message);
    }
    next();
  } catch (error) {
    return AppError(res, error.message ?? 'Access denied.', 403);
  }
}

module.exports = {
  usersCheck,
  adminsCheck,
  superAdminCheck
};
