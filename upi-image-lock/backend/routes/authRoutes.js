const express = require('express');
const { register, login } = require('../controllers/authController');
const apiLimiter = require('../middlewares/rateLimitMiddleware');

const router = express.Router();

router.post('/register', apiLimiter, register);
router.post('/login', apiLimiter, login);

module.exports = router;