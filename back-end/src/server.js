
require('dotenv').config();

const app = require('./app/app');
/**
 *
 * Configuración de escucha del servidor
 * En entorno de desarrollo local (localhost) no es necesario especificar la dirección IP en `app.listen()`, ya que Node.js por defecto escucha en `127.0.0.1`.
 * En entornos de producción o servidores VPS (como Debian, AWS o servidores caseros), es necesario configurar el servidor para escuchar en todas las interfaces de red utilizando:
 */
const PORT = process.env.PORT || 3000;

// Encender el servidor
app.listen(PORT, '0.0.0.0',() => {
    console.log(`🚀 Servidor corriendo limpiamente en el puerto ${PORT}`);
    console.log(`📖 Documentación disponible en http://localhost:${PORT}/api-docs`);
});