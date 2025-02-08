const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const PaymentSchema = new mongoose.Schema(
    {
        imageId: { type: mongoose.Schema.Types.ObjectId, ref: 'Image', required: true },
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        transactionId: { type: String, required: true, unique: true, default: uuidv4 }, // Unique transaction ID
        amount: { type: Number, required: true },
        status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Payment', PaymentSchema);