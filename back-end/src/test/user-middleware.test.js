import { validateUserData } from '../src/middlewares/userMiddleware.js';

describe('User Middleware', () => {
  // Mock req, res objects for testing
  let req, res, next;
  beforeEach(() => {
    req = {
      body: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  describe('validateUserData middleware', () => {
    test('should pass validation with valid user data', () => {
      const validUserData = {
        name: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        role: 'admin',
      };

      req.body = validUserData;

      validateUserData(req, res, next);

      expect(next).toHaveBeenCalledTimes(1);
    });

    test('should return 400 if any required field is missing', () => {
      const incompleteUserData = {
        name: 'John',
        email: 'john@example.com',
        role: 'admin',
      };

      req.body = incompleteUserData;

      validateUserData(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ mensaje: 'Todos los campos (name, lastName, email, role) son obligatorios' });
      expect(next).not.toHaveBeenCalled();
    });

    test('should return 400 if role field has invalid value', () => {
      const invalidRoleUserData = {
        name: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        role: 'invalidRole',
      };

      req.body = invalidRoleUserData;

      validateUserData(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ mensaje: 'El valor del campo "role" debe ser "root", "admin" o "normal"' });
      expect(next).not.toHaveBeenCalled();
    });
  });
});
