import express from 'express';
import userRoutes from '../routes/user-router.js';
import authRoutes from '../routes/auth-routes.js';
import router from './story-routes.js';
import * as AuthController from '../controllers/auth-controler.js';

const { Router } = express;
router.use('/users', userRoutes);

router.use('/auth', authRoutes);

router.use('/register', AuthController.register);


export default Router;
