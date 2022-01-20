import {mongoose} from '../../data/db/mongodb/config.js';
import ProductSchema from '../../data/db/mongodb/schema.js';

const items = [
  {
    nombre: "Jabon Liquido Ariel",
    descripcion: "Jabon Liquido Concentrado 8 Lavados",
    foto: "https://eistore.vteximg.com.br/arquivos/ids/157278-690-690/7.jpg?v=637363844538070000",
    precio: 640.92,
    stock: 3,
    id: 1,
    timestamp: "12/15/2021, 2:10:30 AM",
    codigo: 92
  },
  {
    nombre: "Moto G100 128 GB",
    descripcion: "azul nimbus 8 GB RAM",
    foto: "https://http2.mlstatic.com/D_NQ_NP_645703-MLA46248898134_062021-O.webp",
    precio: 97,
    stock: 7,
    id: 2,
    timestamp: "12/15/2021, 2:13:31 AM",
    codigo: 540
  },
  {
    nombre: "House Of X - 1",
    descripcion: "Comics En Ingles",
    foto: "https://http2.mlstatic.com/D_NQ_NP_662993-MLA44947732926_022021-O.webp",
    precio: 750,
    stock: 12,
    id: 3,
    timestamp: "12/15/2021, 2:14:34 AM",
    codigo: 258
  },
  {
    nombre: "Smart Tv Samsung",
    descripcion: "Series 4 Led Hd 32",
    foto: "https://http2.mlstatic.com/D_NQ_NP_934496-MLA45625835121_042021-O.webp",
    precio: 29.999,
    stock: 18,
    id: 4,
    timestamp: "12/15/2021, 2:16:25 AM",
    codigo: 676
  },
  {
    nombre: "Microsoft Xbox",
    descripcion: "Series 5 512gb Standard Color Blanco",
    foto: "https://http2.mlstatic.com/D_NQ_NP_627149-MLA44484230438_012021-O.webp",
    precio: 94.999,
    stock: 7,
    id: 5,
    timestamp: "12/15/2021, 2:17:34 AM",
    codigo: 909
  },
  {
    nombre: "Vino",
    descripcion: "Regalo Caja Navidenia Luigi Bosca Mlabec Rutini",
    foto: "https://http2.mlstatic.com/D_NQ_NP_720926-MLA48499623576_122021-O.webp",
    precio: 3.769,
    stock: 28,
    id: 6,
    timestamp: "12/15/2021, 2:18:39 AM",
    codigo: 971
  }
];

class Productos {
  constructor(collection, itms) {
    this.table = collection;
    this.products = itms;
    this.exist();
  }

  async saveProducts(products) {
    products.forEach(async prod => {
      const item = new ProductSchema({
          _id: prod.id,
          nombre: prod.nombre,
          descripcion: prod.descripcion,
          foto: prod.foto,
          precio: prod.precio,
          stock: prod.stock,
          timestamp: prod.timestamp,
          codigo: prod.codigo
      });
      await item.save();
    });
  }

  async exist() {
    let exist = false;
    let models = mongoose.modelNames();
    exist = models.includes('Products');
    let resp = mongoose.model(this.table);
    let cantidad = await resp.find();
    if (!exist || cantidad.length === 0) {
      await this.saveProducts(this.products);
    }
  }

  async getProducts() {
    const model = mongoose.model(this.table);
    const products = await model.find();
    return products;
  }

  async getProductById(id) {
    const model = mongoose.model(this.table);
    const product = await model.find({ _id: id });
    if (product.length === 0) return { error: 'producto no encontrado' };
    return product;
  }

  async saveProduct(product) {
    const saveProduct = new ProductSchema(product);
    const saved = await saveProduct.save();
    return saved;
  }

  async updateProduct(id, product) {
    let updateProd = {};
    for (const prop in product) {
      updateProd[prop] = product[prop]
    }
    const model = mongoose.model(this.table);
    const updated = await model.findOneAndUpdate({ _id: id }, updateProd);
    if (updated) return { error: 'no', actualizado: updated }
    return { error: 'producto no encontrado' };
  }

  async deleteProduct(id) {
    const model = mongoose.model(this.table);
    const deleted = await model.deleteOne({ _id: id});
    if (deleted.deletedCount === 0) return { error: 'producto no encontrado' }
    return { id: id, removido: 'operacion exitosa' };
  }
}

export default new Productos('Products', items);
