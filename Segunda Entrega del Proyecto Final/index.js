import express from 'express';
import NotFound from './routes/NotFound.js';
import productosRoute from './routes/ProductosRoute.js';
import carritoRoute from './routes/CarritoRoute.js';

const app = express();
const PORT = process.env.PORT || 8080;

// S E T T I N G S
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// R O U T E S
app.use('/api/productos', productosRoute);
app.use('/api/carrito', carritoRoute);
app.use(NotFound);

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
