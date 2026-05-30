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
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Servidor de Desarrollo Local',
            },
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

    apis: [path.join(__dirname, '../routes/*.js')],
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = { swaggerDocs };