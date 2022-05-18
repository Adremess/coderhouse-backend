const JTW = require("../../utils/jwt/jwt");
const BCRYPT = require("../../utils/bcrypt/bcrypt");
const UserSchema = require("../../dto/models/user");

class Register {
  async NewUser(req, res, next) {
    const { nombre, usuario, email, password } = req.body;
    const user = new UserSchema({
      nombre, 
      usuario, 
      email, 
      password: await BCRYPT.createHash(password)
    })
    await user.save();
    // JTW.
    console.log(user);
    return res.redirect('/login')
  }
};

module.exports = new Register();