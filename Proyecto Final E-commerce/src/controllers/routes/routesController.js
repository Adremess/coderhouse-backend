const Products = require("../productos/productosController");

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
}

module.exports = new Routes();
