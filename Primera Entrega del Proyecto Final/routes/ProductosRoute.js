import express from 'express';
import Productos from '../handlers/productosHandler.js';

const router = express.Router();
export const ProductosHandler = new Productos();

const validateIsAdmin = (req, res, next) => {
  if (req.headers.isadmin !== 'false') {
    next();
  } else {
    res.json({
      error: -1,
      descripcion: `ruta ${req.protocol}://${req.headers.host}${req.originalUrl} metodo ${req.method} no autorizada`,
    })
  }
};

router.get('/:id?', async (req, res) => {
  try {
    req.params.id ?
      res.json(await ProductosHandler.getProductById(req.params.id))
      : res.json(await ProductosHandler.getProducts().catch(err => console.log(err)));
  } catch (err) {
    throw new Error(err.message);
  }
});

router.post('/', validateIsAdmin, async (req, res) => {
  try {
    res.json(await ProductosHandler.saveProduct(req.body))
  } catch (err) {
    console.log(err.message);
  }
});

router.put('/:id', validateIsAdmin, async (req, res) => {
  try {
    res.json(await ProductosHandler.updateProduct(req.params.id, req.body));
  } catch (error) {
    throw new Error(err.message);
  }
});

router.delete('/:id', validateIsAdmin, async (req, res) => {
  try {
    res.json(await ProductosHandler.deleteProduct(req.params.id));

  } catch (err) {
    throw new Error(err.message);
  }
});

export default router;
