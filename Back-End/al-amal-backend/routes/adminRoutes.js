const express = require('express');
const adminController = require('../controllers/admin');
const authenticator = require('../middleware/authenticator');
const { adminsCheck, superAdminCheck } = require('../middleware/roleMiddleware');

const router = express.Router();

// Auth =============== >>

router.post('/login', adminController.sign.login);
router.post('/signup', adminController.sign.signup);

// Counts =============== >>

router.get('/get-counts', authenticator, adminsCheck, adminController.getCounts);

// Users =============== >>

router.get('/get-users', authenticator, adminsCheck, adminController.users.getAllUsers);
router.post('/add-user', authenticator, adminsCheck, adminController.users.addUser);
router.delete(
  '/delete-user/:userId',
  authenticator,
  superAdminCheck,
  adminController.users.deleteUser
);
router.patch('/update-user/:userId', authenticator, adminsCheck, adminController.users.updateUser);

// Admins =============== >>

router.get('/get-admins/', authenticator, superAdminCheck, adminController.admins.getAllAdmins);
router.get('/get-admins/:userId', authenticator, superAdminCheck, adminController.admins.getAdmin);
router.post('/add-admin', authenticator, superAdminCheck, adminController.admins.addAdmin);
router.delete(
  '/delete-admin/:userId',
  authenticator,
  superAdminCheck,
  adminController.admins.deleteAdmin
);
router.patch(
  '/update-admin/:userId',
  authenticator,
  superAdminCheck,
  adminController.admins.updateAdmin
);

module.exports = router;
