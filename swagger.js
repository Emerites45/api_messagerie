const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Configuration de Swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0', // Version d'OpenAPI
    info: {
      title: 'Mon API',
      version: '1.0.0',
      description: 'Documentation de mon API',
    },
    servers: [
      {
        url: 'http://localhost:3000', // URL de votre API
      },
    ],
  },
  apis: ['./routes/*.js'], // Chemin vers les fichiers contenant les commentaires Swagger
};

// Initialisation de swaggerJSDoc
const swaggerDocs = swaggerJsDoc(swaggerOptions);