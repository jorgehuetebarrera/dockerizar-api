import express from 'express';
import * as UserController from '../controllers/userController.js';
import * as AuthController from '../controllers/auth-controler.js';

const router = express.Router();

router.post('/register', AuthController.register);

router.post('/', UserController.createUser);

router.get('/', UserController.getAllUsers);

router.get('/:userId', UserController.getUserById);

router.put('/:userId', UserController.updateUser);

router.delete('/:userId', UserController.deleteUser);

export default router;