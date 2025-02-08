const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Swagger Configuration Options
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "PaytoView API Documentation",
      version: "1.0.0",
      description: "API documentation for PaytoView – a UPI-locked image viewing platform",
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Local development server",
      },
      {
        url: "https://your-deployment-url.com",
        description: "Production server",
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ BearerAuth: [] }],
  },
  apis: ["./routes/*.js"], // Scans route files for API definitions
};

const swaggerSpec = swaggerJsdoc(options);

const swaggerDocs = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log("📄 Swagger API Docs available at: http://localhost:5000/api-docs");
};

module.exports = swaggerDocs;