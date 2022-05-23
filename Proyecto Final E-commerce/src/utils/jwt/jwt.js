const JsonWT = require("jsonwebtoken");
const { jwt_key } = require("../../config/index");

class JsonWebToken {
  createToken(user) {
    return JsonWT.sign({
      user:user.usuario,
      id: user._id
    }, jwt_key.private_key,
    {
      expiresIn: '3m'
    });
  };

  verifyToken(req, res, next) {
    const token = req.cookies.jwt;
    if (!token) return res.render('logear', { error: 'DENEGADO', message: 'inicie sesion'});
    try {
      const verified = JsonWT.verify(token, jwt_key.private_key);
      next();
    } catch (error) {
      res.render('logear', { error: 'EXPIRADO', message: 'iniciar sesion' });
    }
  };
};

module.exports = new JsonWebToken();
