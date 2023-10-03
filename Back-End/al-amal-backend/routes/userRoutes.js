const express = require('express');
const userController = require('../controllers/user');

const router = express.Router();

// Auth =============== >>

router.post('/login', userController.sign.login);
router.post('/signup', userController.sign.signup);

module.exports = router;
