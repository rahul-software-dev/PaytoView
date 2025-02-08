const express = require("express");
const { uploadImage, viewImage } = require("../controllers/imageController");
const authenticate = require("../middlewares/authMiddleware");
const cacheMiddleware = require("../middlewares/cacheMiddleware");
const multer = require("multer");

const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Images
 *   description: Image Upload & Viewing Routes
 */

/**
 * @swagger
 * /api/images/upload:
 *   post:
 *     summary: Upload an image (protected)
 *     tags: [Images]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *               price:
 *                 type: number
 *                 description: Price to unlock the image
 *     responses:
 *       201:
 *         description: Image uploaded successfully
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Unauthorized
 */
router.post("/upload", authenticate, upload.single("image"), uploadImage);

/**
 * @swagger
 * /api/images/view/{id}:
 *   get:
 *     summary: View an image after payment (protected)
 *     tags: [Images]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the image
 *     responses:
 *       200:
 *         description: Image retrieved successfully
 *       403:
 *         description: Payment required
 *       404:
 *         description: Image not found
 */
router.get("/view/:id", authenticate, cacheMiddleware, viewImage);

module.exports = router;