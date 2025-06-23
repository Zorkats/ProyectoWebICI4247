import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import userRoutes from './routes/user.routes.js';
import authRoutes from './routes/auth.routes.js';
import tripRoutes from './routes/trip.routes.js';
import destinationRoutes from './routes/destination.routes.js';
import poiRoutes from './routes/poi.routes.js';
import searchRoutes from './routes/search.routes.js'; // <-- IMPORTA
import itineraryRoutes from './routes/itinerary.routes.js'; // <-- IMPORTA


const app = express();

app.use(express.json());
app.use(cookieParser()); // <-- Usar el middleware

const corsOptions = {
  // CAMBIO: No uses '*', especifica el origen de tu app Ionic.
  origin: 'http://localhost:8100', // O el puerto que use `ionic serve`
  
  // NUEVO: Esta opción es OBLIGATORIA para que las cookies funcionen.
  credentials: true 
};

app.use(cors(corsOptions));
app.use(helmet());
if (process.env.NODE_ENV !== 'test') app.use(morgan('dev'));

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/destinations', destinationRoutes);
app.use('/api/pois', poiRoutes);
app.use('/api/search', searchRoutes); // <-- REGISTRA LA RUTA
app.use('/api/itinerary-items', itineraryRoutes); // <-- REGISTRA
app.get('/', (_, res) => res.send('API funcionando correctamente ✅'));

// 404 handler
app.use((_, res) => res.status(404).json({ message: 'Ruta no encontrada' }));

// error handler
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ message: 'Error interno del servidor' });
});

export default app;
