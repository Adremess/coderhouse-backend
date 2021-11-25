class ApiHandler {
  constructor() {
    this.productos = [];
  }

  getProductos() {
    if (this.productos.length === 0) return { error: 'productos no encontrados' };
    return this.productos;
  }

  getProductoById(id) {
    let product = this.productos.filter(prod => Number(prod.id) === Number(id));
    if (product.length === 0) return { error: 'producto no encontrado' };
    return product;
  }

  deleteProductById({ id }) {
    let exist = false;
    for(let i = 0; i < this.productos.length; i++) {
      if (Number(this.productos[i].id) === Number(id)) {
        this.productos.splice(i, 1);
        exist = true;
      }
    }
    if (exist) return this.productos;
    return { error: 'producto no encontrado' };
  }

  addProduct(product) {
    if (this.productos.length < 1) {
      product.id = 1;
      this.productos.push(product);
    } else {
      product.id = this.productos[this.productos.length - 1].id + 1;
      this.productos.push(product);
    }
    console.log(product.id);
    return product;
  }

  updateProductById( {title, price, thumbnail}, {id} ) {
    let exist = false;
    let item = 0;
    for (let i = 0; i < this.productos.length; i++) {
      if (Number(this.productos[i].id) === Number(id)) {
        if (title) this.productos[i].title = title;
        if (price) this.productos[i].price = price;
        if (thumbnail) this.productos[i].thumbnail = thumbnail;
        if (id) this.productos[i].id = id;
        exist = true;
        item = i;
      }
    }
    if (!exist) return{ error: 'producto no encontrado' };
    return this.productos[item];
  }
};

module.exports = ApiHandler;
