import swaggerJsdoc from "swagger-jsdoc";

const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Taskora API",
      version: "1.0.0",
      description: "Task management backend API"
    },
    servers: [
      {
        url: "http://localhost:3000"
      }
    ],
    tags: [
      {
        name: "Health",
        description: "Health check endpoints"
      }
    ]
  },
  apis: ["./src/routes/*.ts"]
});

export default swaggerSpec;