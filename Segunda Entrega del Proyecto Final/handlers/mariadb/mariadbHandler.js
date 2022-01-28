import db_obj from '../../data/db/mariadb/config.js';

const db = db_obj.client;

class Productos {
  constructor(tabla) {
    this.table = tabla;
    this.existTable();
  }

  async existTable() {
    try {
      await db.schema.hasTable(this.table).then(table => {
        if (!table) this.createTable();
      });
    } catch (error) {
      console.log(error);
    }
  };

  async createTable() {
    try {
      let create = await db.schema.createTable(this.table, table => {
        table.increments("id").primary
        table.string("nombre")
        table.string("descripcion")
        table.string("foto")
        table.float("precio")
        table.integer("stock")
        table.timestamp("timestamp")
        table.integer("codigo")
      });
      console.log('Create table: ', create);
    } catch (error) {
      console.log(error);
    }
  };

  async getProducts() {
    try {
      let res = await db.from(this.table);
      if (res.length === 0) return { error: 'productos no encontrados'};
      return res;
    } catch (error) {
      console.log(error)
    }
  };

  async getProductById(id) {
    try {
      console.log(id);
      let product = await db.from(this.table).select('id', 'nombre', 'descripcion', 'foto', 'precio', 'stock', 'timestamp', 'codigo' ).where({ id: id });
      if (product.length === 0) return { error: 'producto no encontrado' };
      return product; 
    } catch (error) {
      console.log(error)
    }
  };

  async saveProduct(product) {
    try {
      let resp = await db.from(this.table).insert(product);
      return resp;
    } catch (error) {
      console.log(error)
    }
  };

  async updateProduct(id, {nombre, descripcion, foto, precio, stock, codigo}) {
    try {
      let prevProduct = await db.from(this.table).where({ id: id });
      if (prevProduct.length === 0) return { error: 'producto no encontrado' };
      if (nombre) await db.from(this.table).where({ id: id }).update({ nombre });
      if (descripcion) await db.from(this.table).where({ id: id }).update({ descripcion });
      if (foto) await db.from(this.table).where({ id: id }).update({ foto });
      if (precio) await db.from(this.table).where({ id: id }).update({ precio });
      if (stock) await db.from(this.table).where({ id: id }).update({ stock });
      if (codigo) await db.from(this.table).where({ id: id }).update({ codigo });
      return `Producto actualizado.`
    } catch (error) {
      console.log(error)
    }
  };

  async deleteProduct(id) {
    try {
      let resp = await db.from(this.table).where({ id: id }).del();
      if (resp) return `Producto con id ${id} eliminado.`;
      return { error: `producto con id ${id} no encontrado` };
    } catch (error) {
      console.log(error);
    }
  };
};

export default new Productos('ProductosMaria');
