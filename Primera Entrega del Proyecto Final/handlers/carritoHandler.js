import FileHandler from './fileHandler.js';
import { ProductosHandler } from '../routes/ProductosRoute.js';

class Carrito {
  constructor() {
    this.File = new FileHandler('Carrito');
  }

  async createCart() {
    try {
      return await this.File.createCart();
    } catch (err) {
      console.log(err);
    }
  }

  async deleteCart(id) {
    try {
      let cartFile = await this.File.getAll();
      if (!cartFile.error) {
        let cart = JSON.parse(cartFile);
        if (cart.id === Number(id)) {
          return await this.File.deleteCart(id);
        }
        return `Error en el borrado del carrito con id: ${id}`;
      }
      return `Error en el borrado del carrito con id: ${id}`;
    } catch (err) {
      console.log(err);
    }
  }

  async getCartProducts(id) {
    try {
      let cartFile = await this.File.getAll();
      if (!cartFile.error) {
        let cart = JSON.parse(cartFile);
        if (cart.id === Number(id)) {
          return cart.productos;
        }
        return `Carrito con id ${id} no existe.`;
      }
    } catch (err) {
      console.log(err);
    }
  }

  async addCartProduct(id) {
    try {
      let cartFile = await this.File.getAll();
      let productById = await ProductosHandler.getProductById(id);
      if (!cartFile.error) {
        let cart = JSON.parse(cartFile);
        cart.productos.push(productById[0]);
        await this.File.saveUpdate(cart);
        return `Producto con id ${id} agregado al carrito.`;
      }
      return `Error al agregar el producto con id ${id} al carrito.`;
    } catch (err) {
      console.log(err);
    }
  }

  async deleteById(idCart, idProd) {
    try {
      let cartFile = await this.File.getAll();
      if(!cartFile.error) {
        let cart = JSON.parse(cartFile);
        if (cart.id === Number(idCart)) {
          let prodIndex = cart.productos.findIndex(el => el.id === Number(idProd));
          cart.productos.splice(prodIndex, 1);
          await this.File.saveUpdate(cart);
          return `Producto con id ${idProd} removido del carrito con id ${idCart}.`;
        }
      }
      return `Error al remover producto con id ${idProd} de carrito con id ${idCart}.`;
    } catch (err) {
      console.log(err);
    }
  }
};

export default Carrito;
