const ApiHandler = require("./apiHandler.js");
const express = require("express");
const { Router } = express;

const ApiController = new ApiHandler();
const app = express();
const router = new Router;

const PORT = 8080;

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api/productos', router);
app.use(express.static('public'));


router.get('/', (req, res) => {
  try {
    res.json(ApiController.getProductos());
  } catch (error) {
    console.log(error);
  }
});

router.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    res.json(ApiController.getProductoById(id));
  } catch (error) {
    console.log(error);
  }
});

router.post('/', (req, res) => {
  try {
    let producto = req.body;
    res.json(ApiController.addProduct(producto));
  } catch ({error}) {
    console.Error(error)
  }
});

router.put('/:id', (req, res) => {
  try {
    res.json(ApiController.updateProductById(req.body, req.params));
  } catch ({error}) {
    throw Error(error)
  }
});

router.delete('/:id', (req, res) => {
  try {
    res.send(ApiController.deleteProductById(req.params));
  } catch ({error}) {
    console.log(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
