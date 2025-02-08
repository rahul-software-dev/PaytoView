const cloudinary = require('../config/cloudinaryConfig');

const uploadImage = async (filePath) => {
    try {
        const result = await cloudinary.uploader.upload(filePath, { folder: 'locked_images' });
        return result.secure_url;
    } catch (error) {
        console.error('Cloudinary Upload Error:', error.message);
        throw new Error('Failed to upload image');
    }
};

module.exports = { uploadImage };