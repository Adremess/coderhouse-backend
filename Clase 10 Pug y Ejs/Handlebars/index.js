const express = require("express");
const { engine } = require("express-handlebars");
const PORT = 3000;
const ApiHandler = require("./apiHandler");

const app = express();
const ApiController = new ApiHandler();

app.engine("handlebars", engine({
  extname: "hbs",
  defaultLayout: "",
  layoutsDir: "",
}));

app.set("views", "./views");
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.render("form", { data: ApiController.getProductos() });
});

app.get('/productos', (req, res) => {
  res.render("historial", { data: ApiController.getProductos() });
});

app.post('/productos', (req, res) => {
  ApiController.addProduct(req.body);
  res.redirect('/');
});


app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
