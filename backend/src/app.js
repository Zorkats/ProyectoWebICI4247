import express, { json } from 'express';
import cors from 'cors';
import { UserRouter } from './routes/user.routes.js';

const app = express();

app.use(json());
app.use(cors());


const PORT = process.env.PORT || 3000;

app.use('/', UserRouter)

export default app;