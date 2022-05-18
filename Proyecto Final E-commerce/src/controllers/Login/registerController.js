const JTW = require("../../utils/jwt/jwt");

class Register {
  async NewUser(req, res, next) {
    const { nombre, usuario, email, password } = req.body;
    const user = {
      nombre, 
      usuario, 
      email, 
      password
    }
    // JTW.
    return res.redirect('/login')
  }
};

module.exports = new Register();