import express from 'express';
import authRoutes from './routes/auth.routes.js';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({ status: 'ok', message: '¡API de Sweet Trip funcionando!' });
});

app.get('/api/saludo', (req, res) => {
  res.json({ mensaje: '¡Hola desde la API!' });
});

app.use('/api/auth', authRoutes);
export default app;