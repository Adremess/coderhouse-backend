const Login = require("../controllers/Login/loginController");
const Register = require("../controllers/Login/registerController");
const { verifyToken } = require("../utils/jwt/jwt");
const Pages = require("../controllers/routes/routesController");
const Products = require("../controllers/productos/productosController");

module.exports = app => {
  app.get('/', verifyToken, Pages.productos);
  app.get('/register', Pages.register);
  app.post('/registeruser', Register.NewUser);
  app.post('/validatelogin', Login.Validate);
  app.get('/login', Pages.login);
  app.get('/productos', verifyToken, Pages.productos);
  app.post('/productos', Pages.newProduct);
  app.get('/productos/:categoria', );
  app.get('/productos/:id', Pages.findProducto);
  app.get('/carrito', );
  app.get('/carrito:id', );
}
