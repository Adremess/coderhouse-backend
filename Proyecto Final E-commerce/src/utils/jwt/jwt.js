const JsonWT = require("jsonwebtoken");
const { jwt_key } = require("../../config/index");

class JsonWebToken {
  createToken(user) {
    return JsonWT.sign({
      user:user.usuario,
      id: user._id
    }, jwt_key.private_key,
    {
      expiresIn: '1m'
    });
  };

  verifyToken(req, res, next) {
    const token = req.cookies.jwt;
    if (!token) return res.json({ error: 'Acceso denegado, inicie sesion para poder ingresar.'});
    try {
      const verified = JsonWT.verify(token, jwt_key.private_key);
      next();
    } catch (error) {
      res.json({ error: 'Sesion expirada, vuelva a iniciar sesion.' });
    }
  };
};

module.exports = new JsonWebToken();
