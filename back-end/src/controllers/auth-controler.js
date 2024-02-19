import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config.js';
import User from '../models/user.js';

// Función para iniciar sesión
export const login = async (req, res) => {
  const { correoElectronico, contraseña } = req.body;

  try {
    // Buscar el usuario en la base de datos por correo electrónico
    const user = await User.findOne({ correoElectronico });

    // Si no se encuentra el usuario, devolver un error de autenticación
    if (!user) {
      return res.status(401).json({ mensaje: 'Credenciales inválidas' });
    }

    // Verificar si la contraseña es correcta
    if (!bcrypt.compareSync(contraseña, user.contraseña)) {
      return res.status(401).json({ mensaje: 'Credenciales inválidas' });
    }

    // Generar un token JWT
    const token = jwt.sign({ id: user._id }, config.jwtSecret, { expiresIn: '1h' });

    // Devolver el token como respuesta
    res.json({ token });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};
