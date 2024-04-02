import jwt from 'jsonwebtoken';
import config from '../src/config.js';
import { authenticateUser, authorizeUser } from '../src/middlewares/auth-middleware.js';

describe('Auth Middleware', () => {
  // Mock req, res objects for testing
  let req, res, next;
  beforeEach(() => {
    req = {
      headers: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  describe('authenticateUser middleware', () => {
    test('should authenticate user with valid token', () => {
      const userId = '123456789';
      const token = jwt.sign({ id: userId, role: 'user' }, config.jwtSecret);

      req.headers.authorization = `Bearer ${token}`;

      authenticateUser(req, res, next);

      expect(next).toHaveBeenCalledTimes(1);
      expect(req.user.id).toBe(userId);
    });

    test('should return 401 if no token provided', () => {
      authenticateUser(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: 'No token provided' });
      expect(next).not.toHaveBeenCalled();
    });

    test('should return 401 if token is invalid', () => {
      req.headers.authorization = 'Bearer invalidToken';

      authenticateUser(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: 'Invalid token' });
      expect(next).not.toHaveBeenCalled();
    });
  });

  describe('authorizeUser middleware', () => {
    test('should authorize user with allowed role', () => {
      const userId = '123456789';
      const token = jwt.sign({ id: userId, role: 'admin' }, config.jwtSecret);

      req.headers.authorization = `Bearer ${token}`;
      req.user = { id: userId, role: 'admin' };

      const allowedRoles = ['admin', 'root'];

      authorizeUser(allowedRoles)(req, res, next);

      expect(next).toHaveBeenCalledTimes(1);
    });

    test('should return 403 if user role not allowed', () => {
      const userId = '123456789';
      const token = jwt.sign({ id: userId, role: 'user' }, config.jwtSecret);

      req.headers.authorization = `Bearer ${token}`;
      req.user = { id: userId, role: 'user' };

      const allowedRoles = ['admin', 'root'];

      authorizeUser(allowedRoles)(req, res, next);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({ message: 'Unauthorized' });
      expect(next).not.toHaveBeenCalled();
    });

    test('should return 403 if user not authenticated', () => {
      const allowedRoles = ['admin', 'root'];

      authorizeUser(allowedRoles)(req, res, next);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({ message: 'Unauthorized' });
      expect(next).not.toHaveBeenCalled();
    });
  });
});
