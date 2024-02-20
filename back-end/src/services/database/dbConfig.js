import mongoose from 'mongoose';

const uri = 'mongodb+srv://user:1234@stories.q7jbuug.mongodb.net/?retryWrites=true&w=majority';

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connectDB = async () => {
  try {
    await mongoose.connect(uri, options);
    console.log('Conectado a MongoDB Atlas');
  } catch (error) {
    console.error('Error al conectar a MongoDB Atlas:', error);
  }
};

export default connectDB;
