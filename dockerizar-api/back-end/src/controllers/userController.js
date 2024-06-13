import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config.js';
import { HttpStatusError } from 'common-errors';
import mongoose from 'mongoose';
import User from '../models/user.js'; // Asegúrate de importar correctamente tu modelo de usuario

// Controlador para registrar un nuevo usuario
export const register = async (req, res) => {
  const { userName, surName, password, email } = req.body;

  try {
    // Verificar si ya existe un usuario con este correo electrónico
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Verificar el formato del correo electrónico
    const emailVerificationRegex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    if (!emailVerificationRegex.test(email) || !email) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    // Verificar que se proporcionen todos los campos necesarios
    if (!userName || !surName || !password || !email) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear un nuevo usuario con la referencia a la organización
    const newUser = new User({
      userName,
      surName,
      email,
      password: hashedPassword
    });
    await newUser.save();

    console.log('New user created:', newUser);
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controlador para iniciar sesión de usuario
export const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!config.app.secretKey) {
        throw new Error('Missing secretKey in configuration');
      }

      if (isPasswordValid) {
        const token = jwt.sign({ id: user._id, email: user.email }, config.app.secretKey, { expiresIn: '30d' });
        console.log(`User ${email} logged in successfully`);
        return res.json({ token, email: user.email });
      }
    }

    throw new HttpStatusError(401, 'Invalid credentials');
  } catch (error) {
    console.error('Failed to log in user:', error);
    next(error);
  }
};

export const getAllUsers = async (req, res) => {
  try {
    // Obtener todos los usuarios, excluyendo la contraseña
    const users = await User.find().select('-password');

    if (!users || users.length === 0) {
      console.log("ERROR: No se encontraron usuarios en la base de datos");
      return res.status(404).json({ message: 'No users found in the database' });
    }

    console.log("Users data found:\n", users);
    res.status(200).json(users);
  } catch (error) {
    console.error('ERROR: Failed to fetch users data:\n', error);
    res.status(500).json({ message: 'Error fetching users data' });
  }
};

// Controlador para obtener un usuario por su ID
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    // Asegurarse de que el id sea un ObjectId válido
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.log("ERROR: Invalid user ID provided");
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    // Buscar el usuario por _id, excluyendo la contraseña
    const user = await User.findById(id).select('-password');

    if (!user) {
      console.log("ERROR: No user found with the provided ID");
      return res.status(404).json({ message: `No user found with the provided ID: ${id}` });
    }

    console.log("User data found:\n", user);
    res.status(200).json(user);
  } catch (error) {
    console.error('ERROR: Failed to fetch user data by ID:\n', error);
    res.status(500).json({ message: 'Error fetching user data by ID' });
  }
};

// Controlador para actualizar datos de usuario por ID
export const updateUserById = async (req, res) => {
  try {
    const { id } = req.params;

    // Eliminar _id del cuerpo de la solicitud si está presente
    if (req.body._id) {
      delete req.body._id;
    }

    // Eliminar campos vacíos o nulos del cuerpo de la solicitud
    for (const key in req.body) {
      if (req.body[key] === '' || req.body[key] === null) {
        delete req.body[key];
      }
    }

    // Hasheo de la contraseña si se está actualizando
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }

    // Eliminar el campo de correo electrónico para evitar su actualización
    delete req.body.email;

    // Actualizar el usuario por su ID
    const updatedUser = await User.findByIdAndUpdate(id, { $set: req.body }, { new: true });

    if (!updatedUser) {
      console.log("ERROR: No user found with the provided ID");
      return res.status(404).json({ message: `No user found with the provided ID: ${id}` });
    }

    console.log("User updated successfully:", updatedUser);
    res.status(200).json({ message: "User data updated successfully.", user: updatedUser });
  } catch (error) {
    console.error('ERROR: Failed to update user data by ID ', error);
    res.status(500).json({ message: 'Error updating user data by ID' });
  }
};

// Controlador para eliminar un usuario por correo electrónico
export const deleteUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;

    // Eliminar el usuario por su correo electrónico
    const deletedUser = await User.findOneAndDelete({ email });

    if (!deletedUser) {
      console.log("ERROR: No user found with the provided email");
      return res.status(404).json({ message: `No user found with the provided email: ${email}` });
    }

    console.log(`User deleted successfully: ${deletedUser.userName}`);
    res.status(200).json({ message: `User deleted successfully: ${deletedUser.userName}` });
  } catch (error) {
    console.error('ERROR: Failed to delete user by email:\n', error);
    res.status(500).json({ message: 'Error deleting user' });
  }
};
