import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url'; // Importamos una función más
import Sequelize from 'sequelize';
import sequelize from '../config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = {};

const files = fs.readdirSync(__dirname).filter(file =>
  file.indexOf('.') !== 0 && file !== path.basename(__filename) && file.slice(-3) === '.js'
);

for (const file of files) {
  const filePath = path.join(__dirname, file);
  const fileURL = pathToFileURL(filePath); // Convertimos la ruta a una URL de archivo válida
  
  const module = await import(fileURL); // Usamos la URL en lugar de la ruta de texto
  const model = module.default(sequelize, Sequelize.DataTypes);
  db[model.name] = model;
}

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;