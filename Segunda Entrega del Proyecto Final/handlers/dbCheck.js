import dotenv from 'dotenv';
dotenv.config();

let productos;
let carrito;

(async () => {
  switch (process.env.USE_DB) {
    case "MariaDb":
      const { default: ProductosMaria } = await import('../handlers/mariadb/mariadbHandler.js').catch(err => console.log(err));
      // const { default: ProductosMaria } = await import('../handlers/mariadb/mariadbHandler.js');
      productos = ProductosMaria;
      break;

    case 'FileFsDb':
      console.log('Using ', process.env.USE_DB)
      const { default: ProductosFs } = await import('../handlers/filesystem/productosHandler.js').catch(err => console.log(err));
      productos = new ProductosFs();
      break;

    case 'MongoDb':
      console.log('Using ', process.env.USE_DB)
      // const { default: ProductosFs } = await import('../handlers/filesystem/productosHandler.js').catch(err => console.log(err));
      // productos = new ProductosFs();
      break;
    default:
      console.log(process.env.USE_DB);
      break;

    case 'FirebaseDb':
      console.log('Using ', process.env.USE_DB)
      // const { default: ProductosFs } = await import('../handlers/filesystem/productosHandler.js').catch(err => console.log(err));
      // productos = new ProductosFs();
      break;
  }
})();

export { productos };
