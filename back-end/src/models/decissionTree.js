import mongoose from 'mongoose';

const { Schema } = mongoose;

const decissionTreeSchema = new Schema({
  nodoActual: { type: Number, required: true },
  arbol: { type: Schema.Types.Mixed, required: true },
});

const decissionTree = mongoose.model('decissionTree', decissionTreeSchema);

export default decissionTree;
