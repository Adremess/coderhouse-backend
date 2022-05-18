class Routes {
  async index(req, res, next) {
    res.render('index', {});
  }

  async register(req, res, next) {
    res.render('register', {});
  }

  async login(req, res, next) {
    res.render('login', {});
  }
}

module.exports = new Routes();
