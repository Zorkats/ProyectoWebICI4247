import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3308,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

let pool;

try {
  pool = mysql.createPool(dbConfig);
} catch (error) {
  console.error('❌ Error fatal al crear el pool de conexiones de MySQL:', error);
  process.exit(1);
}

export async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Conexión a MySQL establecida exitosamente!');
    connection.release();
  } catch (error) {
    console.error('❌ No se pudo conectar a la base de datos de MySQL:', error.message);
  }
}

export { pool };