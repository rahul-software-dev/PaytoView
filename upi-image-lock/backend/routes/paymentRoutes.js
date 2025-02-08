const express = require("express");
const { generateUPI, verifyPayment } = require("../controllers/paymentController");
const authenticate = require("../middlewares/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Payments
 *   description: UPI Payment Processing Routes
 */

/**
 * @swagger
 * /api/payments/generate-upi:
 *   post:
 *     summary: Generate a UPI QR Code for image access
 *     tags: [Payments]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - imageId
 *             properties:
 *               imageId:
 *                 type: string
 *                 description: The ID of the image for which payment is required
 *     responses:
 *       200:
 *         description: UPI QR code generated successfully
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Unauthorized
 */
router.post("/generate-upi", authenticate, generateUPI);

/**
 * @swagger
 * /api/payments/verify-payment:
 *   post:
 *     summary: Verify UPI payment and grant access to image
 *     tags: [Payments]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - transactionId
 *               - imageId
 *             properties:
 *               transactionId:
 *                 type: string
 *                 description: The transaction ID received after UPI payment
 *               imageId:
 *                 type: string
 *                 description: The ID of the image being accessed
 *     responses:
 *       200:
 *         description: Payment verified successfully, access granted
 *       400:
 *         description: Payment verification failed
 *       401:
 *         description: Unauthorized
 */
router.post("/verify-payment", authenticate, verifyPayment);

module.exports = router;