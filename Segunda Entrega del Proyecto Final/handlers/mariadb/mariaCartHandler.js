import db_obj from '../../data/db/mariadb/config.js';

const db = db_obj.client;

class Carrito {
  constructor(cart) {
    this.cart = cart;
    this.existTable();
  }

  async existTable() {
    try {
      await db.schema.hasTable(this.cart).then(table => {
        if (!table) this.createTable();
      });
    } catch (error) {
      console.log(error);
    }
  };

  async createTable() {
    try {
      let create = await db.schema.createTable(this.cart, table => {
        table.increments("id").primary
        table.timestamp("timestamp")
        table.json("productos") 
      });
      console.log('Create cart: ', create);
    } catch (error) {
      console.log(error);
    }
  };

  async createCart() {
    try {
      let data = { productos: JSON.stringify('') };
      let create = await db.from(this.cart).insert(data);
      console.log(create);
      return create;
    } catch (error) {
      console.log(error);
    }
  };

  async addCartProduct(id) {
    try {
      let product = await db.from("ProductosMaria").where({ id: Number(id) });
      let cart = await db.from(this.cart)
      let prevProds = JSON.parse(cart[0].productos);
      if (prevProds === '') {
        prevProds = [product]
      } else {
        prevProds.push(product)
      }
      await db.from(this.cart).update({ productos: JSON.stringify(prevProds) });
      return product;
    } catch (error) {
      console.log(error);
    }
  };

  async deleteCart(id) {
    try {
      let deleted = await db.from(this.cart).where({ id: Number(id) }).del();
      return deleted;
    } catch (error) {
      console.log(error);
    }
  };

  async getCartProducts(id) {
    try {
      let cartProducts = await db.from(this.cart).where({ id: Number(id) });
      if (cartProducts.length === 0) return { message: `Carrito con id ${id} no existe.` }
      let prods = JSON.parse(cartProducts[0].productos).flatMap(arr => {
        if (Array.isArray(arr)) {
          return arr;
        }
      });
      return prods;
    } catch (error) {
      console.log(error);
    }
  };

  async deleteById(id) {
    try {
      let cart = await db.from(this.cart);
      let prods = JSON.parse(cart[0].productos).flat(1);
      let filteredProds = prods.filter(prod => prod.id !== Number(id));
      await db.from(this.cart).update({ productos: JSON.stringify(filteredProds) });
      return filteredProds;
    } catch (error) {
      console.log(error);
    }
  };
};

export default new Carrito('Carrito');
