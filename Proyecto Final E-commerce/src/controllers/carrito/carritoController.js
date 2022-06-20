const mongoose = require("mongoose");
const CartSchema = require("../../dto/models/cart");
const JWT = require("../../utils/jwt/jwt");

class Carrito {
  async findCart(req, res, next) {
    const model = mongoose.model("carrito");
    const items = await model.find();
    const responseItems = await items[0];
    return responseItems;
  }

  async createCart(email) {
    const newCart = new CartSchema({
      email,
      items: [],
      direccion: {
        calle: '',
        numero: ''
      }
    });
    await newCart.save();
  }

  async addProductToCart(req, res, next) {
    const item = {
      id: req.body.id,
      nombre: req.body.nombre,
      precio: req.body.precio,
      stock: req.body.stock,
      cantidad: req.body.cantidad,
      foto: req.body.foto,
    };
    const model = mongoose.model("carrito");
    model.updateOne(
      { email: JWT.getEmail(req) },
      { $addToSet: 
          { 
            items: [item] 
          } 
      },
      function (err, result) {
        if (err) {
          res.send(err);
        } else {
          res.send(result);
        }
      }
    );
  }

  async removeProductFromCart(req, res, next) {
    const model = mongoose.model("carrito");
    const del = await model.updateOne(
      { email: JWT.getEmail(req) },
      {
        $pull: {
          items: { id: req.body.id }
        }
      }
    );
    res.send(del);
  }
}

module.exports = new Carrito();
