const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        data: { type: Buffer, required: true }, // Encrypted image data
        locked: { type: Boolean, default: true }, // Lock status
        price: { type: Number, required: true, min: 1 }, // Amount required to unlock
        deletedAt: { type: Date, default: null } // Soft delete
    },
    { timestamps: true }
);

// Virtual field for checking soft delete status
ImageSchema.virtual('isDeleted').get(function () {
    return this.deletedAt !== null;
});

// Method to unlock image
ImageSchema.methods.unlock = function () {
    this.locked = false;
    return this.save();
};

module.exports = mongoose.model('Image', ImageSchema);