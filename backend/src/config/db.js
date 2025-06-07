import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,      
  process.env.DB_USER,      
  process.env.DB_PASSWORD,  
  {
    host: process.env.DB_HOST || 'localhost', 
    dialect: 'mysql', 
    logging: false    
  }
);

export async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión con Sequelize establecida exitosamente!');
  } catch (error) {
    console.error('❌ No se pudo conectar a la base de datos con Sequelize:', error);
  }
}

// Exportamos la instancia configurada para usarla en los modelos
export default sequelize;