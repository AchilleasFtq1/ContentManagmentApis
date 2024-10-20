const express = require("express");
const supertokens = require("supertokens-node");
const { middleware } = require("supertokens-node/framework/express");
const Session = require("supertokens-node/recipe/session");
const EmailPassword = require("supertokens-node/recipe/emailpassword");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Import your routes
const phoneNumberRoutes = require("./routes/phoneNumber"); // Phone-related routes
const contentRoutes = require("./routes/content"); // Content-related routes
const postRoutes = require("./routes/post"); // Post management routes

// Initialize SuperTokens
supertokens.init({
  framework: "express",
  supertokens: {
    connectionURI: "http://localhost:3567", // SuperTokens self-hosted instance URI
  },
  appInfo: {
    appName: "CMS Express Prisma", // Your app name
    apiDomain: "http://localhost:3001", // Your API domain (updated for port 3001)
    websiteDomain: "http://localhost:3001", // Frontend domain (updated for port 3001)
    apiBasePath: "/auth", // API base path for authentication
  },
  recipeList: [
    EmailPassword.init(), // Email-password authentication
    Session.init(), // Session management
  ],
});

const app = express();
app.use(express.json()); // Enable JSON parsing

// SuperTokens middleware
app.use(middleware());

// Swagger definition
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "CMS Express Prisma API Documentation",
    version: "1.0.0",
    description: "API documentation for CMS Express Prisma project",
  },
  servers: [
    {
      url: "http://localhost:3001", // Updated server URL to use port 3001
      description: "Development server",
    },
  ],
};

// Swagger options
const swaggerOptions = {
  swaggerDefinition,
  apis: ["./routes/*.js"], // Path to route files for documentation
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Swagger UI setup
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Route to serve the raw Swagger JSON specification
app.get("/swagger.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

// Route Definitions
app.use("/phone", phoneNumberRoutes); // Phone number authentication routes
app.use("/admin/content", contentRoutes); // Content management routes
app.use(postRoutes); // Post-related routes

// Test SuperTokens
app.get("/auth", (req, res) => {
  res.send("SuperTokens authentication set up!");
});

// Start the server on port 3001
app.listen(3001, () => {
  console.log("Server is running on http://localhost:3001");
  console.log("Swagger docs available at http://localhost:3001/api-docs");
  console.log("Swagger JSON available at http://localhost:3001/swagger.json");
});
