const winston = require('winston');

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'logs/requests.log' })
    ]
});

const requestLogger = (req, res, next) => {
    logger.info(`${req.method} ${req.url} - ${req.ip}`);
    next();
};

module.exports = requestLogger;