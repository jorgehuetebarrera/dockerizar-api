import express from 'express';
import userRoutes from '../routes/user-router.js';
import authRoutes from '../routes/auth-routes.js';
import storyRouter from './story-routes.js';
import * as AuthController from '../controllers/auth-controler.js';

const router = express.Router();
router.use('/users', userRoutes);

router.use('/auth', authRoutes);
router.use('/story', storyRouter);

router.post('/register', AuthController.register);


export default router;
