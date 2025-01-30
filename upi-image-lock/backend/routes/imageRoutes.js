const express = require('express');
const { uploadImage, viewImage } = require('../controllers/imageController');
const authenticate = require('../middlewares/authMiddleware');
const cacheMiddleware = require('../middlewares/cacheMiddleware');
const multer = require('multer');

const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

// Upload image (Protected route)
router.post('/upload', authenticate, upload.single('image'), uploadImage);

// View image (Cache layer added)
router.get('/view/:id', authenticate, cacheMiddleware, viewImage);

module.exports = router;