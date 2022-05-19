const Products = require("../productos/productosController");

class Routes {
  async index(req, res, next) {
    res.render('index', {data: req});
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
}

module.exports = new Routes();
