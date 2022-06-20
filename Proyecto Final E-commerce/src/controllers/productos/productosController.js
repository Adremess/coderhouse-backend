const mongoose = require("mongoose");
const ProductSchema = require("../../dto/models/product");
const fs = require("fs");

class Productos {
  async loadProducts() {
    // FALTAN: auto
    const data = fs.readFile('.\\src\\assets\\productos\\zapatillas.json', 'utf-8' , async (err, dat) => {
      if (!err) {
        let parseDat = JSON.parse(dat);
        for (let i = 0; i < parseDat.length; i++) {
          const model = mongoose.model("products");
          const products = await model.find();
          const id = products.length + 1;
          parseDat[i].id = id;
          await this.newProduct(parseDat[i]);

        }
      } else {
        console.log(err)
      }
    });
  }

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
}

module.exports = new Productos();
