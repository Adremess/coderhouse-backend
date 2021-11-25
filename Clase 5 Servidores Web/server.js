const express = require("express");
const Contenedor = require("./contenedor.js");
const app = express();

const PORT = 8080;

const Productos = new Contenedor('productos');

const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
});
server.on("error", error => console.log(`Error en servidor ${error}`))

app.get('/productos', async (req, res) => {
  let data = await Productos.getAll().then(data => data);
  res.send(data);
});

app.get('/productoRandom', async (req, res) => {
  let item = (Math.floor(Math.random() * 3)) + 1;
  let data = await Productos.getById(item).then(data => data);
  res.send(data);
});
