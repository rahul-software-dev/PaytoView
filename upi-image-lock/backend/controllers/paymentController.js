const QRCode = require('qrcode');
const axios = require('axios');
const Image = require('../models/Image');

exports.generateUPI = async (req, res) => {
    try {
        const { imageId, amount } = req.body;

        const upiLink = `upi://pay?pa=your-merchant-id@upi&pn=UPI Merchant&mc=1234&tid=TXN123456&tr=order${imageId}&tn=Unlock Image&am=${amount}&cu=INR`;

        const qrCode = await QRCode.toDataURL(upiLink);
        res.json({ qrCode });
    } catch (error) {
        res.status(500).json({ message: 'Error generating UPI QR', error });
    }
};

// Verify UPI payment
exports.verifyPayment = async (req, res) => {
    try {
        const { transactionId, imageId } = req.body;

        // Mock API call to UPI verification service
        const response = await axios.post('https://upi-verification-api.com/verify', { transactionId });

        if (!response.data.success) return res.status(400).json({ message: 'Payment verification failed' });

        // Unlock image
        await Image.findByIdAndUpdate(imageId, { locked: false });

        res.json({ message: 'Payment successful, image unlocked' });
    } catch (error) {
        res.status(500).json({ message: 'Payment verification failed', error });
    }
};