import mongoose from 'mongoose';

const { Schema } = mongoose;

const arbolDecisionesSchema = new Schema({
  nodoActual: { type: Number, required: true },
  arbol: { type: Schema.Types.Mixed, required: true },
});

const ArbolDecisiones = mongoose.model('ArbolDecisiones', arbolDecisionesSchema);

export default ArbolDecisiones;
