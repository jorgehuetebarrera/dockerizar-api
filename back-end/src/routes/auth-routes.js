import express from 'express';
import * as AuthController from '../controllers/auth-controler.js';
import { login } from '../controllers/auth-controler.js';

const router = express.Router();

// Endpoint para iniciar sesión
router.post('/login', login);

export default router;
