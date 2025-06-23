// routes/search.routes.js
import express from 'express';
import { performSearch } from '../controllers/search.controller.js';

const router = express.Router();

router.get('/', performSearch);

export default router;