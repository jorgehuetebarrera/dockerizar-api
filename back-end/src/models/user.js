import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  apellidos: {
    type: String,
    required: true,
    trim: true
  },
  correoElectronico: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  rol: {
    type: String,
    enum: ['root', 'admin', 'usuarioNormal'],
    default: 'usuarioNormal'
  }
});

const User = mongoose.model('User', userSchema);

export default User;
