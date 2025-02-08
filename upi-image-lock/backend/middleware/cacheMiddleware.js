const redisClient = require('../config/redisConfig');

const cacheMiddleware = async (req, res, next) => {
    const { id } = req.params;
    const cachedData = await redisClient.get(`image:${id}`);
    
    if (cachedData) {
        return res.status(200).json(JSON.parse(cachedData));
    }
    next();
};

module.exports = cacheMiddleware;