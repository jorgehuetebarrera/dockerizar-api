import * as UserController from '../src/controllers/userController.js';
import User from '../src/models/user.js';

describe('User Controller', () => {
  // Mock req, res objects for testing
  let req, res;
  beforeEach(() => {
    req = {
      body: {},
      params: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  describe('createUser function', () => {
    test('should create a new user and return status 201', async () => {
      // Mock req.body
      req.body = {
        name: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        role: 'user',
      };

      // Mock User.findOne to return null (no existing user)
      User.findOne = jest.fn().mockResolvedValue(null);

      // Mock User.save to return new user
      const saveMock = jest.fn().mockResolvedValue(req.body);
      User.prototype.save = saveMock;

      await UserController.createUser(req, res);

      expect(User.findOne).toHaveBeenCalledTimes(1);
      expect(User.findOne).toHaveBeenCalledWith({ email: req.body.email });

      expect(saveMock).toHaveBeenCalledTimes(1);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(req.body);
    });
  });

    describe('getAllUsers function', () => {
      test('should return all users', async () => {
        // Mock User.find to return array of users
        const users = [
          { name: 'John', lastName: 'Doe', email: 'john@example.com', role: 'user' },
          { name: 'Jane', lastName: 'Doe', email: 'jane@example.com', role: 'user' },
        ];
        User.find = jest.fn().mockResolvedValue(users);

        await UserController.getAllUsers(req, res);

        expect(User.find).toHaveBeenCalledTimes(1);

        expect(res.json).toHaveBeenCalledWith(users);
      });

      // Add more test cases for error handling, empty list, etc.
    });

    describe('getUserById function', () => {
      test('should return user by ID', async () => {
        const userId = '123456789';
        const user = { _id: userId, name: 'John', lastName: 'Doe', email: 'john@example.com', role: 'user' };

        req.params.userId = userId;

        // Mock User.findById to return user
        User.findById = jest.fn().mockResolvedValue(user);

        await UserController.getUserById(req, res);

        expect(User.findById).toHaveBeenCalledTimes(1);
        expect(User.findById).toHaveBeenCalledWith(userId);

        expect(res.json).toHaveBeenCalledWith(user);
      });

      // Add more test cases for error handling, user not found, etc.
    });

    describe('updateUser function', () => {
      test('should update user by ID', async () => {
        const userId = '123456789';
        const updateData = { name: 'Updated John' };

        req.params.userId = userId;
        req.body = updateData;

        // Mock User.findByIdAndUpdate to return updated user
        const updatedUser = { _id: userId, name: 'Updated John', lastName: 'Doe', email: 'john@example.com', role: 'user' };
        User.findByIdAndUpdate = jest.fn().mockResolvedValue(updatedUser);

        await UserController.updateUser(req, res);

        expect(User.findByIdAndUpdate).toHaveBeenCalledTimes(1);
        expect(User.findByIdAndUpdate).toHaveBeenCalledWith(userId, updateData, { new: true });

        expect(res.json).toHaveBeenCalledWith(updatedUser);
      });

      // Add more test cases for error handling, user not found, etc.
    });

    describe('deleteUser function', () => {
      test('should delete user by ID', async () => {
        const userId = '123456789';

        req.params.userId = userId;

        // Mock User.findByIdAndDelete to return deleted user
        const deletedUser = { _id: userId, name: 'John', lastName: 'Doe', email: 'john@example.com', role: 'user' };
        User.findByIdAndDelete = jest.fn().mockResolvedValue(deletedUser);

        await UserController.deleteUser(req, res);

        expect(User.findByIdAndDelete).toHaveBeenCalledTimes(1);
        expect(User.findByIdAndDelete).toHaveBeenCalledWith(userId);

        expect(res.json).toHaveBeenCalledWith({ message: 'Usuario eliminado correctamente' });
      });

    });
  });

