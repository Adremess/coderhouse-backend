const express = require("express");
const app = express();
const PORT = 8080;
const path = require("path");
const ApiHandler = require("./apiHandler");

const ApiController = new ApiHandler();

app.set("views", path.join(__dirname, "views", "ejs"));
app.set("view engine", "ejs");


app.use(express.json());
app.use(express.urlencoded({extended: false}))


app.get('/', (req, res) => {
  res.render('index', { personas: ApiController.getProductos()}); // VIEW ENGINE EJS
});

app.get('/productos', (req, res) => {
  res.render('./partials/historial.ejs', { personas: ApiController.getProductos() });
});

app.post('/productos', (req, res) => {
  ApiController.addProduct(req.body);
  res.redirect('/');
});

app.listen(PORT, () => {
  console.log(`Server on http://localhost:${PORT}`);
});
