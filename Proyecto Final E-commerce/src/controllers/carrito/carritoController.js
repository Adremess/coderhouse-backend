const mongoose = require("mongoose");
const CartSchema = require("../../dto/models/cart");
const JWT = require("../../utils/jwt/jwt");

class Carrito {
  async testt(req, res, next) {
    console.log(req.body);
    return req.body;
    // res.redirect('/productos');
  }

  async findCart(req, res, next) {
    const model = mongoose.model("carrito");
    const items = await model.find();
    const responseItems = await items[0];
    return responseItems;
  }

  async createCart(email) {
    const newCart = new CartSchema({
      email,
      // items: [{
      //   id: req.body.items[0].id,
      //   nombre: req.body.items[0].nombre,
      //   precio: req.body.items[0].precio,
      //   stock: req.body.items[0].stock,
      //   cantidad: req.body.items[0].cantidad,
      //   foto: req.body.items[0].foto
      // }],
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

  // async findIndex(email, item_name) {
  //   const model = mongoose.model("carrito");
  //   const index = model.findOne(
  //     { email: email },
  //     function (err, doc) {
  //       if (err) {
  //         return err;
  //       } else {
  //         const index = doc.items.map(e => e.nombre).indexOf(item_name);
  //         return index;
  //       }
  //     }
  //   );
  //   return index;
  // }

  async removeProductFromCart(req, res, next) {
    const model = mongoose.model("carrito");
    const del = await model.updateOne(
      { email: req.body.email },
      {
        $pull: {
          items: { nombre: req.body.item }
        }
      }
    );
    res.send(del);
  }


}

module.exports = new Carrito();
