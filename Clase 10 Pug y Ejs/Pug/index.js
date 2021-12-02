const express = require("express");
const app = express();
const PORT = 8080;
const path = require("path");
const ApiHandler = require("./apiHandler");

const ApiController = new ApiHandler();

app.set("views", path.join(__dirname, "views", "pug"));
app.set("view engine", "pug");


app.use(express.json());
app.use(express.urlencoded({extended: false}))


app.get('/', (req, res) => {
  res.render('forms.pug', { personas: ApiController.getProductos()});
});

app.get('/productos', (req, res) => {
  res.render('historial.pug', { personas: ApiController.getProductos() });
});

app.post('/productos', (req, res) => {
  ApiController.addProduct(req.body);
  res.redirect('/');
});

app.listen(PORT, () => {
  console.log(`Server on http://localhost:${PORT}`);
});
