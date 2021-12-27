const db_obj = require("./db/mariadb");
const db = db_obj.client;

class ApiHandler {
  constructor(tabla) {
    this.table = tabla;
    this.existTable();
  }

  async existTable() {
    try {
      let exist = await db.schema.hasTable(this.table).then(data => {
        if (!data) this.createTable()
      });
      return exist;
    } catch (error) {
      console.log(error);
    }
  };

  async createTable() {
    try {
      await db.schema.createTable(this.table, table => {
        table.increments("id").primary
        table.string("nombre")
        table.float("precio")
        table.string("foto")
      });
    } catch (error) {
      console.log(error)
    }
  };

  async getProductos() {
    try {
      let response = await db.from(this.table);
      if (response.length === 0) return { error: 'productos no encontrados' };
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async getProductoById(id) {
    try {
      let item = await db.from(this.table).select('id', 'nombre', 'precio', 'foto').where({ id: id });
      if (item.length === 0) return { error: 'producto no encontrado' };
      return item;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProductById( id ) {
    try {
      let response = await db.from(this.table).where({ id: id }).del();
      if (response) return `Producto con id ${id} eliminado.`;
      return { error: 'producto no encontrado' };
    } catch (error) {
      console.log(error);
    }
  }

  async addProduct(product) {
    try {
      const { title, price, thumbnail } = product;
      let data = {
        nombre: title,
        precio: price,
        foto: thumbnail
      };
      await db.from(this.table).insert(data);
      return resp;
    } catch (error) {
      console.log(error);
    }
  }

  async updateProductById( {nombre, precio, foto}, id ) {
    try {
      if (nombre) await db.from(this.table).where({ id: id }).update({ nombre });
      if (precio) await db.from(this.table).where({ id: id }).update({ precio });
      if (foto) await db.from(this.table).where({ id: id }).update({ foto });
      return await db.from(this.table).select('id', 'nombre', 'precio', 'foto').where({ id: id });;
    } catch (error) {
      console.log(error);
    }
  }
};

module.exports = ApiHandler;
