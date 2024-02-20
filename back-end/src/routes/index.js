import express from 'express';
import userRoutes from '../routes/user-router.js';
import authRoutes from '../routes/auth-routes.js';
import router from './story-routes.js';

const { Router } = express;
router.use('/users', userRoutes);

router.use('/auth', authRoutes);



export default Router;
