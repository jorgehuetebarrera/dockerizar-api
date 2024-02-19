import express from 'express';
import * as UserController from '../controllers/userController.js';

const router = express.Router();

router.post('/', UserController.createUser);

router.get('/', UserController.getAllUsers);

router.get('/:userId', UserController.getUserById);

router.put('/:userId', UserController.updateUser);

router.delete('/:userId', UserController.deleteUser);

export default router;
