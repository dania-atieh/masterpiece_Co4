const express = require('express');
const authController = require('../controllers/auth');
const authenticator = require('../middleware/authenticator');

const router = express.Router();
// Auth =============== >>

router.post('/forgot-password', authController.forgotPassword);
router.patch('/reset-password/:token', authController.resetPassword);

// Me =============== >>

router.get('/get-me', authenticator, authController.getMe);
router.patch('/update-me', authenticator, authController.updateMe);
router.delete('/delete-me', authenticator, authController.deleteMe);
router.patch('/update-my-password', authenticator, authController.updatePassword);

module.exports = router;
