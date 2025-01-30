const TransactionLog = require('../models/TransactionLog');

exports.getLogs = async (req, res) => {
    try {
        const logs = await TransactionLog.find().sort({ createdAt: -1 });
        res.json(logs);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching logs', error });
    }
};