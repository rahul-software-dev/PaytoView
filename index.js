require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const securityMiddleware = require("./middleware/securityMiddleware");
const errorMiddleware = require("./middleware/errorMiddleware");
const apiLimiter = require("./middleware/rateLimitMiddleware");
const redisClient = require("./config/redisConfig");
const requestLogger = require("./middleware/requestLogger");
const swaggerDocs = require("./config/swaggerConfig"); // Import Swagger

const app = express();

// 🔹 Connect to MongoDB
connectDB();

// 🔹 Middleware Setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
securityMiddleware(app); // Apply security headers
app.use(apiLimiter);
app.use(requestLogger);

// 🔹 API Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/payments", require("./routes/paymentRoutes"));
app.use("/api/images", require("./routes/imageRoutes"));

// 🔹 Swagger API Documentation
swaggerDocs(app);

// 🔹 Error Handling Middleware
app.use(errorMiddleware);

// 🔹 Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
    console.log(`🚀 Server running on port ${PORT}`);

    // Attempt Redis Connection
    try {
        await redisClient.connect();
        console.log("🟢 Redis connected successfully");
    } catch (error) {
        console.error("🔴 Redis connection failed:", error.message);
    }

    console.log(`📄 API Documentation available at: http://localhost:${PORT}/api-docs`);
});