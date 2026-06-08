const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path'); // 1. Importamos 'path'

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Control de Activos Fijos',
            version: '1.0.0',
            description: 'Documentación del sistema de gestión e inventario de activos.',
        },

        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT', // Indica que usamos tokens JWT
                }
            }
        },
        servers: [
            {
                url: 'https://sistema-activos-cesal.onrender.com',
                description: 'Servidor de Producción (Render)'
            },
            {
                url: 'http://localhost:3000',
                description: 'Servidor Local (Mi Computadora)'
            },
            {
                url: 'http://192.168.18.15:3000',
                description: 'Servidor Casero'

            },
        ],
    },
    // 2. Corregimos usando path.join para asegurar que encuentre la carpeta routes
    apis: [path.join(__dirname, '../routes/*.js')],
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = { swaggerDocs };