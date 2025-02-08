const paymentValidationMiddleware = (req, res, next) => {
    const { amount, transactionId } = req.body;
    if (!amount || amount <= 0) {
        return res.status(400).json({ message: 'Invalid payment amount' });
    }
    if (!transactionId) {
        return res.status(400).json({ message: 'Transaction ID is required' });
    }
    next();
};

module.exports = paymentValidationMiddleware;