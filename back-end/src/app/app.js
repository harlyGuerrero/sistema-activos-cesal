const express = require('express');
const cors = require('cors');


const authRoutes = require('../routes/auth.routes');

const userRoutes = require('../routes/user.routes');


const { swaggerDocs } = require('../config/swagger');

const app = express();


app.use(express.json());
app.use(cors());


app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);


swaggerDocs(app);

module.exports = app;