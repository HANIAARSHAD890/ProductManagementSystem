const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Product Management API",
            version: "1.0.0",
            description: "API documentation for product & category backend"
        },
        servers: [
            {
                url: "http://localhost:5000"
            }
        ]
    },
    apis: ["./routes/*.js"], // scanning your routes code for docs
};

const swaggerSpec = swaggerJsDoc(options);

function swaggerDocs(app) {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

module.exports = swaggerDocs;
