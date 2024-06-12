import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config.js';
import { HttpStatusError } from 'common-errors';
import mongoose from 'mongoose';


export const register = async (req, res) => {
  const { userName, surName, password, email, } = req.body;

  try {
    // Verificar si ya existe un usuario con este correo electrónico
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Verificar el formato del correo electrónico
    const emailVerificationRegex =
/^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    if (!emailVerificationRegex.test(email) || !email) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    // Verificar el formato del correo electrónico y que seproporcionen todos los campos necesarios
    if (!userName || !surName || !password || !email) {
      return res.status(400).json({ message: 'Todos los campos sonrequeridos' });
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
    console.log(newUser);
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


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


//====================[GET DATA]====================

// Controlador para obtener un usuario por su ID
export const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;

    // Buscar el usuario por id, excluyendo la contraseña
    const user = await User.findOne({ userId }).select('-password');

    if (!user) {
      console.log("ERROR: No se encontró ningún usuario con la ID proporcionada");
      return res.status(404).json({ message: `No user found with the
provided ID. ID provided: ${userId}` });
    }
    console.log("Datos del usuario encontrados:\n", user);
    res.status(200).json(user);
  } catch (error) {
    console.log('ERROR: Error al obtener los datos del usuario por ID:\n', error);
    res.status(500).json({ message: 'Error fetching user data by ID' });
  }
};

// Controlador para obtener los datos de un usuario por su email
export const getUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;

    // Buscar el usuario por correo, excluyendo la contraseña
    const user = await User.findOne({ email }).select('-password');

    if (!user) {
      console.log("ERROR: No se encontró ningún usuario con el correo electrónico proporcionado");
    }

    console.log("Datos del usuario encontrados:", user);
    res.status(200).json(user);
  } catch (error) {
    console.log('ERROR: Error al obtener los datos del usuario por correo electrónico', error);
    res.status(500).json({ message: 'Error fetching user data by email' });
  }
};




//====================[UPDATE DATA]====================

export const updateUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;

    let user = await User.findOne({ email }).select('-password');
    if (!user) {
      console.log("ERROR: No se encontró ningún usuario con el correo electrónico proporcionado");
      return res.status(404).json({ message: `No user found with the
provided email. Email provided: ${email}` });
    }


    // Elimina las claves vacías o nulas del cuerpo de la solicitud
    for (const key in req.body) {
      if (req.body[key] === '' || req.body[key] === null) {
        delete req.body[key];
      }
    }

    //Hasheo de la contraseña
    req.body.password = await bcrypt.hash(req.body.password, 10);

    // Elimina las claves que no deben ser actualizadas
    delete req.body.email;

    user = await User.findOneAndUpdate({ email }, { $set: req.body },
{ new: true });

    console.log("Usuario actualizado:", user);
    res.status(200).json({ message: "The user data has been updated successfully." });
  } catch (error) {
    console.log('ERROR: Error al actualizar los datos del usuario por correo electrónico', error);
    res.status(500).json({ message: 'Error updating user data by email.' });
  }
};


export const updateUserById = async (req, res) => {
  try {
    const { userId } = req.params;

    let user = await User.findOne({ userId }).select('-password');
    if (!user) {
      console.log("ERROR: No se encontró ningún usuario con el correo electrónico proporcionado");
      return res.status(404).json({ message: `No user found with the
provided ID. ID provided: ${userId}` });
    }


    // Elimina las claves vacías o nulas del cuerpo de la solicitud
    for (const key in req.body) {
      if (req.body[key] === '' || req.body[key] === null) {
        delete req.body[key];
      }
    }

    //Hasheo de la contraseña
    req.body.password = await bcrypt.hash(req.body.password, 10);

    // Elimina las claves que no deben ser actualizadas
    delete req.body.email;

    user = await User.findOneAndUpdate({ userId }, { $set: req.body },
{ new: true });

    console.log("Usuario actualizado:", user);
    res.status(200).json({ message: "The user data has been updated successfully." });
  } catch (error) {
    console.log('ERROR: Error al actualizar los datos del usuario por su ID ', error);
    res.status(500).json({ message: 'Error updating user data by ID.' });
  }
};






//====================[DELETE USER]====================


// Controlador para eliminar un usuario por correo electrónico
export const deleteUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;

    const user = await User.findOneAndDelete({ email });
    if (!user) {
      console.log("ERROR: No se encontró ningún usuario con el correo electrónico proporcionado");
      return res.status(404).json({ message: `No user found with the
provided email. Email provided: ${email}` });
    }
    const username = user.username;
    // Verificar si se eliminó un usuario


    // Devolver los datos del usuario eliminado
    console.log(`Usuario eliminado correctamente: ${username}`);
    res.status(200).json({ message: `User deleted successfully: ${username}` });
  } catch (error) {
    console.log('\nERROR: Error al eliminar el usuario por correo electrónico:\n', error);
    res.status(500).json({ message: 'Error deleting user' });
  }
};




