const express = require('express');
const AuthController = require('../controllers/authController');

const router = express.Router();

router.post('/registration', AuthController.registration);
router.post('/login', AuthController.login);
router.post('/refresh', AuthController.refresh);

module.exports = router;