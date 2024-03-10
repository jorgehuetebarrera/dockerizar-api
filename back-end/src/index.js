import app from './app.js';
import config from './config.js';
import connectDB from './services/database/dbConfig.js';
import ArbolDecisiones from './models/ArbolDecisiones.js';
import generarArbolDeDecisiones from './generarArbolDeDecisiones.js';

connectDB();
const { port } = config;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

const arbol = generarArbolDeDecisiones(); // Generar el árbol de decisiones
const nuevoArbol = new ArbolDecisiones({ nodoActual: 1, arbol }); // Crear un nuevo documento con el árbol de decisiones
nuevoArbol.save()
  .then(() => console.log('Árbol de decisiones guardado en la base de datos'))
  .catch((error) => console.error('Error al guardar el árbol de decisiones:', error));
