const Products = require("../productos/productosController");
const Cart = require("../carrito/carritoController");

class Routes {
  async index(req, res, next) {
    res.render('productos', {});
  }

  async register(req, res, next) {
    res.render('register', {});
  }

  async login(req, res, next) {
    res.render('login', {});
  }

  async productos(req, res, next) {
    res.render('productos', { data: await Products.findAllProducts() });
  }

  async newProduct(req, res, next) {
    await Products.newProduct(req.body);
    res.redirect('/productos');
  }

  async findProducto(req, res, next) {
    const product = await Products.findOneProduct(req.params.id);
    res.render('producto', { data: product });
  };

  async carrito(req, res, next) {
    const data = await Cart.findCart();
    res.render('carrito', { data });
    //   {
    //   nombre: 'Lapiz',
    //   precio: 5.7,
    //   foto: 'https://previews.123rf.com/images/grgroup/grgroup1706/grgroup170600125/79339717-l%C3%A1piz-de-imagen-de-silueta-colorida-con-la-ilustraci%C3%B3n-de-vector-de-borrador.jpg',
    //   cantidad: 2,
    //   stock: 7
    // } });
  }
}

module.exports = new Routes();
