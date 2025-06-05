import 'dotenv/config';

import app from './app.js';

import { pool, testConnection } from './config/db.js';

const PORT = process.env.PORT || 3001;

async function startServer() {
  try {
    await testConnection();

    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
      console.log(`   Visita http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error('❌ Error fatal: no se pudo iniciar el servidor.', error);
    if (pool) await pool.end();
    process.exit(1);
  }
}

startServer();