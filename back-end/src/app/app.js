require('dotenv').config();

const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth.routes');
const {
    swaggerUi,
    specs
} = require('../swagger/swagger');

const app = express();

app.use(express.json());
app.use(cors());

// RUTAS
app.use(authRoutes);

module.exports = app;