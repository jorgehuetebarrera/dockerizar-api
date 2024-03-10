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
  role: {
    type: String,
    enum: ['root', 'admin', 'normal'],
    default: 'normal' // Rol por defecto: normal
  }
});

const User = mongoose.model('User', userSchema);

export default User;
