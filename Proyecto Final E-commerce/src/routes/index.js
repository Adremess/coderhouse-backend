const Login = require("../controllers/Login/loginController");
const Register = require("../controllers/Login/registerController");
const { verifyToken } = require("../utils/jwt/jwt");
const Pages = require("../controllers/routes/routesController");
const Products = require("../controllers/productos/productosController");
const Cart = require("../controllers/carrito/carritoController");

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
  app.get('/carrito', Pages.carrito);
  app.post('/carrito', Cart.addProductToCart);
  app.put('/carrito', Cart.addProductToCart);
  app.delete('/carrito', Cart.removeProductFromCart);
  app.get('/carrito:id', );
}
