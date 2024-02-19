// Importar el modelo de usuario
import User from '../models/user.js';

// Controlador para crear un nuevo usuario
export const createUser = async (req, res) => {
  try {
    const { nombre, apellidos, correoElectronico } = req.body;

    // Verificar si el correo electrónico ya está en uso
    const existingUser = await User.findOne({ correoElectronico });
    if (existingUser) {
      return res.status(400).json({ mensaje: 'El correo electrónico ya está en uso' });
    }

    // Crear un nuevo usuario
    const newUser = new User({ nombre, apellidos, correoElectronico });
    await newUser.save();

    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error al crear usuario:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

// Controlador para obtener todos los usuarios
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

// Controlador para obtener un usuario por su ID
export const getUserById = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error al obtener usuario por ID:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

// Controlador para actualizar un usuario
export const updateUser = async (req, res) => {
  const { userId } = req.params;
  const updateData = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
    res.json(updatedUser);
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};


export const deleteUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
    res.json({ mensaje: 'Usuario eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};
