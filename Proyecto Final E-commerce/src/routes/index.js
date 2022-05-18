const Login = require("../controllers/Login/loginController");
const Register = require("../controllers/Login/registerController");

module.exports = app => {
  app.get('/', (req, res) => { res.render('index', {data: req.headers}) });
  app.get('/register', (req, res) => { res.render('register', {}) });
  app.post('/registeruser', Register.NewUser);
  app.get('/validateuser', Login.Validate);
  app.get('/login', (req, res) => { res.render('login', {}) })
  app.get('/productos', );
  app.get('/productos/:categoria', );
  app.get('/productos/:id', );
  app.get('/carrito', );
  app.get('/carrito:id', );

}
