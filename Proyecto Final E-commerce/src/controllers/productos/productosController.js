const mongoose = require("mongoose");
const ProductSchema = require("../../dto/models/product");

class Productos {

  async newProduct(req, res, next) {
    const { id, nombre, precio, stock, foto, detalles } = req.body;
    const newProduct = new ProductSchema({
      id,
      nombre,
      precio,
      stock,
      foto,
      detalles
    });
    await newProduct.save();
    res.render('productos', {
      status: 'succed',
      message: 'Producto guardado',
      product: newProduct
    }); 
  };

  async findAllProducts() {
    const model = mongoose.model('products');
    const products = await model.find();
    if (products.length === 0) return { status: 'failed', message: 'No hay productos ingresados.' };
    return products;
  };

  async findOneProduct(qer) {};

  async deleteOneProduct(qer) {};

  async deleteAllProducts() {};
};

module.exports = new Productos();
