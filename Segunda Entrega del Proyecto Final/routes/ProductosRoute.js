import express from 'express';
import { productos as ProdsApi } from '../handlers/dbCheck.js';

const router = express.Router();

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
      res.json(await ProdsApi.getProductById(req.params.id))
      : res.json(await ProdsApi.getProducts());
  } catch (err) {
    throw new Error(err.message);
  }
});

router.post('/', validateIsAdmin, async (req, res) => {
  try {
    res.json(await ProdsApi.saveProduct(req.body))
  } catch (err) {
    console.log(err.message);
  }
});

router.put('/:id', validateIsAdmin, async (req, res) => {
  try {
    res.json(await ProdsApi.updateProduct(req.params.id, req.body));
  } catch (err) {
    throw new Error(err.message);
  }
});

router.delete('/:id', validateIsAdmin, async (req, res) => {
  try {
    res.json(await ProdsApi.deleteProduct(req.params.id));

  } catch (err) {
    throw new Error(err.message);
  }
});

export const ProductosHandler = ProdsApi;
export default router;
