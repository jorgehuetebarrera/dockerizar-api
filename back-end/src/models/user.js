import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
    trim: true
  },
  surName: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  }
});

const User = mongoose.model('User', userSchema);

export default User;
