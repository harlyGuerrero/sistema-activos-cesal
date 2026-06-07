const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

//Si estás en Render, usa su URL. Si estás en tu casa, usa la IP de tu servidor casero
const URL_SERVIDOR = process.env.RENDER_EXTERNAL_URL || 'http://localhost:3000';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API CESAL',
            version: '1.0.0'
        },
        servers: [
            {
                url: URL_SERVIDOR, // 👈 Usa la URL completa calculada arriba
                description: process.env.RENDER_EXTERNAL_URL ? 'Servidor de Producción (Render)' : 'Servidor Casero Local'
            }
        ],
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
    specs,
};