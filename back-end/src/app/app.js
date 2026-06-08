const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authRoutes = require('../routes/auth.routes');
const userRoutes = require('../routes/user.routes');
const rolRoutes = require('../routes/rol.routes');
const tipoMaquinariaRoutes = require('../routes/tipoMaquinaria.routes');

const { swaggerDocs } = require('../config/swagger');

const app = express();

app.use(
    helmet({
        contentSecurityPolicy: false
    })
);

app.use(express.json());
app.use(cors());

// Swagger
swaggerDocs(app);

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/roles', rolRoutes);
app.use('/api/tipo-maquinaria', tipoMaquinariaRoutes);

module.exports = app;