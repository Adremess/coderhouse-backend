import FileHandler from './fileHandler.js';

class Productos {
  constructor() {
    this.File = new FileHandler('Productos');
  }

  async getProducts() {
    try {
      let prods = await this.File.getAll();
      if (prods.error) {
        return prods.error;
      }
      let parsedProds = JSON.parse(prods);
      if (parsedProds.length === 0) return { error: `Lista vacia` };
      return parsedProds;
    } catch (err) {
      console.log('Error llamando los productos: ',err.message);
    }
  }

  async getProductById(id) {
    try {
      let fileProds = await this.File.getAll();
      let products = JSON.parse(fileProds);
      let producto = products.filter(el => Number(el.id) === Number(id));
      if (producto.length === 0) return { error: 'producto no encontrado' };
      return producto;
    } catch (err) {
      console.log('Error llamando producto por id: ',err.message);
    }
  }

  async saveProduct(product) {
    try {
      return await this.File.saveProduct(product);
    } catch (err) {
      console.log(err);
    }
  }

  async updateProduct(id, obj) {
    try {
      let fileProds = await this.File.getAll();
      if (!fileProds.error) {
        let products = JSON.parse(fileProds);
        let objIndex = products.findIndex(el => Number(el.id) === Number(id));
        for (const prop in obj) {
          products[objIndex][prop] = obj[prop];
        }
        return await this.File.saveUpdate(products);
      }
      return { error: fileProds.error }
    } catch (err) {
      console.log('Error al actualizar producto: ', err.message);
    }
  }

  async deleteProduct(id) {
    try {
      let fileProds = await this.File.getAll();
      if (!fileProds.error) {
        let products = JSON.parse(fileProds);
        let objIndex = products.findIndex(el => Number(el.id) === Number(id));
        products.splice(objIndex, 1);
        return await this.File.saveUpdate(products);
      } 
      return { error: fileProds.error }
    } catch (err) {
      console.log(`Error al eliminar producto de id ${id}: `, err);
    }
  }
};

export default Productos;
