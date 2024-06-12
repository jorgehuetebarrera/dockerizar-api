import * as AuthController from '../src/controllers/auth-controller.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../src/config.js';
import User from '../src/models/user.js';

// Mock bcrypt.compare function
jest.mock('bcrypt', () => ({
  compare: jest.fn(),
}));

// Mock jwt.sign function
jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(),
}));

describe('Auth Controller', () => {
  // Mock req, res objects for testing
  let req, res;
  beforeEach(() => {
    req = {
      body: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  describe('register function', () => {
    test('should create a new user and return status 201', async () => {
      // Mock User.findOne to return null (no existing user)
      User.findOne = jest.fn().mockResolvedValue(null);

      // Mock bcrypt.hash function
      bcrypt.hash = jest.fn().mockResolvedValue('hashedPassword');

      // Mock req.body
      req.body = {
        name: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: 'password123',
        role: 'user',
      };

      await AuthController.register(req, res);

      expect(User.findOne).toHaveBeenCalledTimes(1);
      expect(User.findOne).toHaveBeenCalledWith({ email: req.body.email });

      expect(bcrypt.hash).toHaveBeenCalledTimes(1);
      expect(bcrypt.hash).toHaveBeenCalledWith(req.body.password, 10);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ message: 'User created successfully' });
    });

  });

  describe('login function', () => {
    test('should return JWT token on successful login', async () => {
      // Mock req.body
      req.body = {
        email: 'john@example.com',
        password: 'password123',
      };

      // Mock User.findOne to return user with matching email
      User.findOne = jest.fn().mockResolvedValue({
        _id: 'user_id',
        password: 'hashedPassword',
      });

      // Mock bcrypt.compare function to return true (password match)
      bcrypt.compare.mockResolvedValue(true);

      // Mock jwt.sign function
      jwt.sign.mockReturnValue('mockedJWTToken');

      // Mock authenticateUser middleware
      const authenticateUserMock = jest.fn((req, res, next) => next());
      AuthController.__Rewire__('authenticateUser', authenticateUserMock);

      await AuthController.login(req, res);

      expect(User.findOne).toHaveBeenCalledTimes(1);
      expect(User.findOne).toHaveBeenCalledWith({ email: req.body.email });

      expect(bcrypt.compare).toHaveBeenCalledTimes(1);
      expect(bcrypt.compare).toHaveBeenCalledWith(req.body.password, 'hashedPassword');

      expect(jwt.sign).toHaveBeenCalledTimes(1);
      expect(jwt.sign).toHaveBeenCalledWith({ id: 'user_id', role: undefined }, config.jwtSecret, { expiresIn: '1h' });

      expect(res.json).toHaveBeenCalledWith({ token: 'mockedJWTToken' });
    });


  });
});
