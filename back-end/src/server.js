
require('dotenv').config();

const app = require('./app/app');

const PORT = process.env.PORT || 3000;

// Encender el servidor
app.listen(PORT,() => {
    console.log(`🚀 Servidor corriendo limpiamente en el puerto ${PORT}`);
    console.log(`📖 Documentación disponible en http://localhost:${PORT}/api-docs`);
});