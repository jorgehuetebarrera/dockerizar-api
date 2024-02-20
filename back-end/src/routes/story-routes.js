import express from 'express';
import { startMystery, meetDetective } from '../controllers/story-controller.js';

const router = express.Router();

// Ruta para iniciar el misterio en Arcadia
router.get('/start', startMystery);

// Ruta para encontrarse con el detective Rafael Cruz
router.get('/meet-detective', meetDetective);

export default router;
