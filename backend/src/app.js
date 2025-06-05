const express = require('express');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json()); // Para parsear JSON

app.get('/', (req, res) => {
  res.send('¡Hola Mundo con Express!');
});

app.get('/api/saludo', (req, res) => {
  res.json({ mensaje: '¡Hola desde la API!' });
});

app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en el puerto ${PORT}`);
  console.log(`Visita http://localhost:${PORT} en tu navegador`);
});