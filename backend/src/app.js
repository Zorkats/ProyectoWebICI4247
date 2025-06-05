import express from 'express';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({ status: 'ok', message: '¡API de Sweet Trip funcionando!' });
});

app.get('/api/saludo', (req, res) => {
  res.json({ mensaje: '¡Hola desde la API!' });
});

export default app;