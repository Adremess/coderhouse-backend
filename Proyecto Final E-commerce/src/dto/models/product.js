const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  nombre: {
    type: String,
    required: true
  },
  precio: {
    type: Number,
    required: true
  },
  stock: {
    type: Number,
    required: true
  },
  foto: {
    type: String,
    required: true
  },
  detalles: {
    type: String,
    required: true
  }
});

module.exports = new mongoose.model('products', ProductSchema);
