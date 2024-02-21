import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
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
