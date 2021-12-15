import fs from 'fs';

class FileHandler {
  constructor(fileName) {
    this.fileName = fileName;
  }

  async getAll() {
    try {
      let exist = await this.exist().then(data => data);

      if (exist) {
        return await fs.promises.readFile(`./data/${this.fileName}.txt`, 'utf8');
      }
      return { error: 'Ingrese productos para poder visualizarlos.' }
    } catch (err) {
      console.log(err);
    }
  }

  async saveProduct(prod) {
    try {
      let exist = await this.exist().then(data => data);
      let date = new Date(Date.now());

      if(exist) {
        let fileData = await fs.promises.readFile(`./data/${this.fileName}.txt`, 'utf8');
        let data = JSON.parse(fileData);
        if (data.length > 0) {
          let lastProductIndex = data.length - 1;
          let lastId = data[lastProductIndex].id;
          prod.id = lastId + 1;
        } else {
          prod.id = 1;
        }
        prod.timestamp = date.toLocaleString();
        prod.codigo = Math.floor(Math.random() * 999);

        data.push(prod);
        await fs.promises.writeFile(`./data/${this.fileName}.txt`, JSON.stringify(data, null, 2));
        return `Producto con id ${prod.id} agregado`;
      } else {
        console.log('Nuevo archivo creado.');
        let data = [];
        prod.id = 1;
        prod.timestamp = date.toLocaleString();
        prod.codigo = Math.floor(Math.random() * 999);
        data.push(prod);
        await fs.promises.writeFile(`./data/${this.fileName}.txt`, JSON.stringify(data, null, 2));
        return `Producto con id ${prod.id} agregado`;
      }
    } catch (err) {
      return console.log(err);
    }
  }

  async exist() {
    try {
      let exist = false;
      let files = await fs.promises.readdir('./data/');
      for (const file of files) {
        if (file === `${this.fileName}.txt`) exist = true;
      }
      return exist;
    } catch (err) {
      console.log(err);
    }
  }

  async saveUpdate(products) {
    try {
      let exist = await this.exist().then(data => data);
      if (exist) {
        await fs.promises.writeFile(`./data/${this.fileName}.txt`, JSON.stringify(products, null, 2));
        return `Lista actualizada con exito.`;
      }
      return `No hay una lista de productos armada.`
    } catch (err) {
      return console.log(err);
    }
  };

  async createCart() {
    try {
      let date = new Date(Date.now());
      const cart = {
        timestamp: `${date.toLocaleString()}`,
        productos: []
      };
      let exist = await this.exist().then(data => data);
      if (exist) {
        let fileData = await fs.promises.readFile(`./data/${this.fileName}.txt`, 'utf8');
        let data = JSON.parse(fileData);
        if (data.length > 0) {
          let lastProductIndex = data.length - 1;
          let lastId = data[lastProductIndex].id;
          cart.id = lastId + 1;
        } else {
          cart.id = 1;
        }
        data.push(cart);
        await fs.promises.writeFile(`./data/${this.fileName}.txt`, JSON.stringify(data, null, 2));
        return `Carrito con id ${cart.id} creado.`;
      }
      cart.id = 1;
      await fs.promises.writeFile(`./data/${this.fileName}.txt`, JSON.stringify(cart, null, 2));
      return `Carrito con id ${cart.id} creado.`;
    } catch (err) {
      return console.log(err);
    }
  }

  async deleteCart(id) {
    try {
      let exist = this.exist().then(data => data);
      if (exist) {
        await fs.promises.unlink(`./data/${this.fileName}.txt`);
        return `Borrado carrito de id ${id} con exito.`
      }
      return `Error en borrado de carrito con id ${id}`;
    } catch (err) {
      console.log(err);
    }
  }

};

export default FileHandler;
