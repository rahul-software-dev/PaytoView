const helmet = require('helmet');
const cors = require('cors');

const securityMiddleware = (app) => {
    app.use(helmet()); // Set security headers
    app.use(cors({ origin: process.env.ALLOWED_ORIGIN, credentials: true }));
};

module.exports = securityMiddleware;