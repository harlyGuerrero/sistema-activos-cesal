const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API CESAL',
            version: '1.0.0'
        },
        servers: [
            {
                url: 'http://192.168.18.15:3000'
            }
        ],
        /**
         * Se hizo el respectivo cambio para hacer pruebas de servidor casero
         * servers: [
         *             {
         *                 url: 'http://localhost:3000'
         *             }
         * ],
         */
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        }
    },
    apis: ['./src/routes/*.js']
};

const specs = swaggerJsdoc(options);

module.exports = {
    swaggerUi,
    specs
};