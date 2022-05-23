const mongoose = require("mongoose");
const ProductSchema = require("../../dto/models/product");

class Productos {
  async newProduct(product) {
    const { id, nombre, precio, stock, foto, detalles } = product;
    const newItem = new ProductSchema({
      id,
      nombre,
      precio,
      stock,
      foto,
      detalles,
    });
    await newItem.save();
    return {
      status: "succed",
      message: "Producto guardado"
    };
  }

  async findAllProducts() {
    const model = mongoose.model("products");
    const products = await model.find();
    if (products.length === 0) {
      return { status: "failed", message: "No hay productos ingresados." };
    } else {
      return products;
    }
  }

  async findOneProduct(qer) {
    const model = mongoose.model("products");
    const product = await model.find({ id: qer });
    if (product.length === 0) {
      return { status: "failed", message: "No hay producto con tal id." };
    } else {
      const { foto, precio, stock, nombre, detalles } = product[0];
      return { foto, precio, stock, nombre, detalles };
    }
  }

  // async deleteOneProduct(qer) {}

  // async deleteAllProducts() {}
}

module.exports = new Productos();
