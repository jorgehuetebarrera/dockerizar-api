import User from '../models/User.js';

// Función para crear un nuevo usuario en la base de datos
export const createUser = async (userData) => {
  try {
    const newUser = new User(userData);
    await newUser.save();
    return newUser;
  } catch (error) {
    throw new Error('Error al crear usuario en la base de datos');
  }
};

// Función para obtener todos los usuarios de la base de datos
export const getAllUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    throw new Error('Error al obtener usuarios de la base de datos');
  }
};

// Función para obtener un usuario por su ID
export const getUserById = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }
    return user;
  } catch (error) {
    throw new Error('Error al obtener usuario por ID');
  }
};

// Función para actualizar un usuario en la base de datos
export const updateUser = async (userId, userData) => {
  try {
    const user = await User.findByIdAndUpdate(userId, userData, { new: true });
    if (!user) {
      throw new Error('Usuario no encontrado');
    }
    return user;
  } catch (error) {
    throw new Error('Error al actualizar usuario en la base de datos');
  }
};

// Función para eliminar un usuario de la base de datos
export const deleteUser = async (userId) => {
  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }
    return user;
  } catch (error) {
    throw new Error('Error al eliminar usuario de la base de datos');
  }
};
