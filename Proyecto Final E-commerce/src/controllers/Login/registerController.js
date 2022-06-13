const JTW = require("../../utils/jwt/jwt");
const BCRYPT = require("../../utils/bcrypt/bcrypt");
const UserSchema = require("../../dto/models/user");
const Cart = require("../carrito/carritoController");

class Register {
  async NewUser(req, res, next) {
    const { nombre, usuario, telefono, email, password } = req.body;
    const user = new UserSchema({
      nombre, 
      usuario,
      telefono, 
      email, 
      password: await BCRYPT.createHash(password)
    })
    await user.save();
    // JTW.
    await Cart.createCart(email);
    console.log(user);
    return res.redirect('/login')
  }
};

module.exports = new Register();