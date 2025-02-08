const express = require('express');
const { generateUPI, verifyPayment } = require('../controllers/paymentController');
const authenticate = require('../middlewares/authMiddleware');

const router = express.Router();

// Generate UPI QR code
router.post('/generate-upi', authenticate, generateUPI);

// Verify payment
router.post('/verify-payment', authenticate, verifyPayment);

module.exports = router;