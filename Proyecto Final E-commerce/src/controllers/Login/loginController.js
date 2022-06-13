const mongoose = require("mongoose");
const JWT = require("../../utils/jwt/jwt");
const Bcrypt = require("../../utils/bcrypt/bcrypt");

class Login {
  async Validate(req, res, next) {
    const model = mongoose.model('users');
    const user = await model.find({ usuario: req.body.usuario })
    if (user.length === 0) return res.json({ error: 'nombre de usuario invalido' });
      
    if(! await Bcrypt.verifyHash(req.body.password, user[0].password)) return res.json({error: 'Contrasenia incorrecta'});
    
    delete req.headers['auth-token'];
    const token = JWT.createToken(user[0]);
    req.user = req.body.usuario;
    req.email = req.body.email;
    res.cookie('jwt', token, { maxAge: 18000000 }).redirect('/productos');
    // res.headers('auth-token', token).redirect('/');
  }
}

module.exports = new Login();
