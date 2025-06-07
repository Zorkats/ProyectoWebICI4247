import 'dotenv/config';
import express from 'express';
import db from './models/index.js'; // Importa la configuración de la BD y los modelos

const app = express();
const PORT = process.env.PORT || 3000;

// Función principal para iniciar el servidor
async function startServer() {
  try {
    await db.sequelize.authenticate();
    console.log('✅ Conexión con la base de datos establecida exitosamente.');

    // Opcional: cambiar a tablas de sequelize (tablas actuales son de schema.sql)
    // await db.sequelize.sync(); //  { force: true } borraría las tablas existentes.

    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
      console.log(`🗓️  Hoy es ${new Date().toLocaleDateString('es-CL', { timeZone: 'America/Santiago' })}`);
    });

  } catch (error) {
    console.error('❌ Error al iniciar el servidor:', error);
    process.exit(1);
  }
}

startServer();