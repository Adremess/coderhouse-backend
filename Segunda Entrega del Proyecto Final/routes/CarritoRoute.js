import express from 'express';
import Carrito from '../handlers/carritoHandler.js';

const router = express.Router();
const carritoHandler = new Carrito('Carrito');

router.get('/:id/productos', async (req, res) => {
  try {
    res.json(await carritoHandler.getCartProducts(req.params.id));
  } catch (err) {
    throw new Error(err.message);
  }
});

router.post('/', async (req, res) => {
  try {
    res.json(await carritoHandler.createCart());
  } catch (err) {
    throw new Error(err.message);
  }
});

router.post('/:id/productos', async (req, res) => {
  try {
    res.json(await carritoHandler.addCartProduct(req.params.id));
  } catch (err) {
    throw new Error(err.message);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    res.json(await carritoHandler.deleteCart(req.params.id));
  } catch (err) {
    throw new Error(err.message);
  }
});

router.delete('/:id/productos/:id_prod', async (req, res) => {
  try {
    res.json(await carritoHandler.deleteById(req.params.id, req.params.id_prod));
  } catch (err) {
    throw new Error(err.message);
  }
});

export default router;
