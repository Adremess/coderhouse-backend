const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
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
  cantidad: {
    type: Number,
    required: true
  },
  foto: {
    type: String,
    required: true
  }
});

const CartSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  items: [itemSchema],
  direccion: {
    calle: {
      type: String
    },
    numero: {
      type: Number
    }
  }
},
{
  timestamps: { createdAt: 'created_at' }
});

module.exports = new mongoose.model('carrito', CartSchema);
