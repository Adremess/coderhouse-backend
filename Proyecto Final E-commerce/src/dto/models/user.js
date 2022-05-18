const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  usuario: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
},
{
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = new mongoose.model('users', UserSchema);
