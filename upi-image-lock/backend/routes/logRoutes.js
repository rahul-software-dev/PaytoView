const express = require('express');
const { getLogs } = require('../controllers/logController');
const authenticate = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

const router = express.Router();

// Get all logs (Admin access only)
router.get('/', authenticate, adminMiddleware, getLogs);

module.exports = router;