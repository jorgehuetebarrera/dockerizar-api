import express from 'express';
import userRoutes from '../routes/user-router.js';
import authRoutes from '../routes/auth-routes.js';

const app = express();

app.use(express.json());


app.use('/users', userRoutes);

app.use('/auth', authRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

export default app;
