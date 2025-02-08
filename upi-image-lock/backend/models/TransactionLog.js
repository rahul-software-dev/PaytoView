const mongoose = require('mongoose');

const TransactionLogSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        action: { type: String, required: true }, // Example: "Image Purchased"
        details: { type: Object, required: true }, // Stores additional metadata
    },
    { timestamps: true }
);

// Index logs for faster search
TransactionLogSchema.index({ userId: 1, createdAt: -1 });

module.exports = mongoose.model('TransactionLog', TransactionLogSchema);