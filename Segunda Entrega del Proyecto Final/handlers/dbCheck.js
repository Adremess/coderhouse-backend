// import { connection } from '../data/db/mongodb/config.js'
import dotenv from 'dotenv';
dotenv.config();

let productos;
let carrito;

(async () => {
  switch (process.env.USE_DB) {
    case "MariaDb":
      const { default: ProductosMaria } = await import('../handlers/mariadb/mariadbHandler.js').catch(err => console.log(err));
      productos = ProductosMaria;
      break;

    case 'FileFsDb':
      console.log('Using ', process.env.USE_DB)
      const { default: ProductosFs } = await import('../handlers/filesystem/productosHandler.js').catch(err => console.log(err));
      productos = new ProductosFs();
      break;

    case 'MongoDb':
      console.log('Using ', process.env.USE_DB)
      const { default: ProductosMongo } = await import('../handlers/mongodb/mongodbHandler.js').catch(err => console.log(err));
      productos = ProductosMongo;
      break;

    case 'FireBaseDb':
      console.log('Using ', process.env.USE_DB)
      const { default: ProductosFirebase } = await import('../handlers/firebase/firebasedbHandler.js').catch(err => console.log(err));
      productos = ProductosFirebase;
      break;

    default:
      console.log(process.env.USE_DB);
      break;

  }
})();

export { productos };
