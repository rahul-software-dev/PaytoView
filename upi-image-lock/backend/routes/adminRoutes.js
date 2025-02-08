const express = require('express');
const { unlockImage, deleteImage } = require('../controllers/adminController');
const authenticate = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

const router = express.Router();

// Manually unlock an image
router.post('/unlock/:id', authenticate, adminMiddleware, unlockImage);

// Delete image (if violating policies)
router.delete('/delete/:id', authenticate, adminMiddleware, deleteImage);

module.exports = router;