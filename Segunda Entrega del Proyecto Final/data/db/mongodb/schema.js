import { mongoose } from './config.js';

const ProductsSchema = new mongoose.Schema({
  _id: Number,
  nombre: String,
  descripcion: String,
  foto: String,
  precio: Number,
  stock: Number,
  timestamp: {
    type: Date,
    default: Date.now()
  },
  codigo: Number  
});

export default mongoose.model('Products', ProductsSchema);
