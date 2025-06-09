// server.js
import 'dotenv/config';
import db from './models/index.js';
import app from './app.js';

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await db.sequelize.authenticate();
    console.log('✅ Conectado a la base de datos.');

    if (process.env.NODE_ENV === 'development') {
      await db.sequelize.sync({ alter: true });
      console.log('🛠️  Sincronizada la base de datos.');
    }

    const server = app.listen(PORT, () => {
      console.log(`🚀 Servidor escuchando en ${PORT}`);
    });

    // Graceful shutdown
    const shutdown = () => {
      console.log('🛑 Cerrando servidor…');
      server.close(() => db.sequelize.close());
    };
    process.on('SIGINT', shutdown).on('SIGTERM', shutdown);
  } catch (error) {
    console.error('❌ Error al iniciar:', error);
    process.exit(1);
  }
}

startServer();
