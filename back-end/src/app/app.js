const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authRoutes = require('../routes/auth.routes');
const userRoutes = require('../routes/user.routes');
const rolRoutes = require('../routes/rol.routes');
const tipoMaquinariaRoutes = require('../routes/tipoMaquinaria.routes');
const activoRoutes = require('../routes/activo.routes');
const catalogoRoutes = require('../routes/catalogo.routes');

const { swaggerDocs } = require('../config/swagger');

const app = express();

app.use(
    helmet({
        contentSecurityPolicy: false
    })
);
app.set('trust proxy', true);
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
    let data = '';
    req.on('data', chunk => { data += chunk; });
    req.on('end', () => {
        if (data.includes("SyntaxError")) { // Filtramos para no llenar la consola
            console.log("--- JSON MALFORMADO RECIBIDO ---");
            console.log(data);
        }
    });
    next();
});

// Swagger
swaggerDocs(app);

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/roles', rolRoutes);
app.use('/api/tipo-maquinaria', tipoMaquinariaRoutes);
app.use('/api/activo',activoRoutes);
app.use('/api/catalogo',catalogoRoutes);

module.exports = app;