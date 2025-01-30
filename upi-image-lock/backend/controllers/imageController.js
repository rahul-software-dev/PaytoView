const Image = require('../models/Image');
const multer = require('multer');
const sharp = require('sharp');

// Upload and encrypt image
exports.uploadImage = async (req, res) => {
    try {
        const { amount } = req.body;
        const userId = req.user.id;

        if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

        // Compress image before storing
        const optimizedImage = await sharp(req.file.buffer)
            .resize({ width: 800 })
            .toFormat('jpeg')
            .toBuffer();

        const newImage = new Image({
            userId,
            data: optimizedImage,
            locked: true,
            price: amount,
        });

        await newImage.save();
        res.status(201).json({ message: 'Image uploaded successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error uploading image', error });
    }
};

// Retrieve image if paid
exports.viewImage = async (req, res) => {
    try {
        const { id } = req.params;
        const image = await Image.findById(id);

        if (!image) return res.status(404).json({ message: 'Image not found' });
        if (image.locked) return res.status(403).json({ message: 'Payment required to view image' });

        res.set('Content-Type', 'image/jpeg');
        res.send(image.data);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving image', error });
    }
};