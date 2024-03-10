import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config.js';
import User from '../models/user.js';
import { authenticateUser } from '../middlewares/auth-middleware.js';

// Esta función de registro de usuario no necesita autenticación
export const register = async (req, res) => {
  const { name, lastName, email, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      lastName,
      email,
      password: hashedPassword,
      role:" "
    });

    await newUser.save();
    console.log(newUser);
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Esta función de inicio de sesión necesita autenticación
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verificar la autenticación del usuario utilizando el middleware authenticateUser
    authenticateUser(req, res, async () => {
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const passwordMatch = bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Se verifica la autenticación antes de generar el token
      const token = jwt.sign({ id: user._id, role: user.role }, config.jwtSecret, { expiresIn: '1h' });

      res.json({ token });
    });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

