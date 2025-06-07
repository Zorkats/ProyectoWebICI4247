import 'dotenv/config';
import express from 'express';
import db from './models/index.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Rutas de prueba o reales
app.get('/', (req, res) => {
  res.send('API funcionando correctamente ✅');
});

// Función principal
async function startServer() {
  try {
    await db.sequelize.authenticate();
    console.log('✅ Conexión con la base de datos establecida exitosamente.');

    if (process.env.NODE_ENV === 'development') {
      await db.sequelize.sync({ alter: true });
      console.log('🛠️ Base de datos sincronizada');
    }

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
