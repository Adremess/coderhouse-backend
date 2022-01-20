import { response } from 'express';
import db from '../../utils/firebase/index.js';

const date = new Date();
const items = [
  {
    nombre: "Jabon Liquido Ariel",
    descripcion: "Jabon Liquido Concentrado 8 Lavados",
    foto: "https://eistore.vteximg.com.br/arquivos/ids/157278-690-690/7.jpg?v=637363844538070000",
    precio: 640.92,
    stock: 3,
    id: 1,
    timestamp: date.toLocaleString(),
    codigo: 92
  },
  {
    nombre: "Moto G100 128 GB",
    descripcion: "azul nimbus 8 GB RAM",
    foto: "https://http2.mlstatic.com/D_NQ_NP_645703-MLA46248898134_062021-O.webp",
    precio: 97,
    stock: 7,
    id: 2,
    timestamp: date.toLocaleString(),
    codigo: 540
  },
  {
    nombre: "House Of X - 1",
    descripcion: "Comics En Ingles",
    foto: "https://http2.mlstatic.com/D_NQ_NP_662993-MLA44947732926_022021-O.webp",
    precio: 750,
    stock: 12,
    id: 3,
    timestamp: date.toLocaleString(),
    codigo: 258
  },
  {
    nombre: "Smart Tv Samsung",
    descripcion: "Series 4 Led Hd 32",
    foto: "https://http2.mlstatic.com/D_NQ_NP_934496-MLA45625835121_042021-O.webp",
    precio: 29.999,
    stock: 18,
    id: 4,
    timestamp: date.toLocaleString(),
    codigo: 676
  },
  {
    nombre: "Microsoft Xbox",
    descripcion: "Series 5 512gb Standard Color Blanco",
    foto: "https://http2.mlstatic.com/D_NQ_NP_627149-MLA44484230438_012021-O.webp",
    precio: 94.999,
    stock: 7,
    id: 5,
    timestamp: date.toLocaleString(),
    codigo: 909
  },
  {
    nombre: "Vino",
    descripcion: "Regalo Caja Navidenia Luigi Bosca Mlabec Rutini",
    foto: "https://http2.mlstatic.com/D_NQ_NP_720926-MLA48499623576_122021-O.webp",
    precio: 3.769,
    stock: 28,
    id: 6,
    timestamp: date.toLocaleString(),
    codigo: 971
  }
];

class Productos {
  constructor(tabla, items) {
    this.collection = tabla;
    this.setItems = items;
    this.itemsLoaded = false;
    if (!this.itemsLoaded) {this.loadProducts();}
  }

  async loadProducts() {
    try {
      const firestoreRef = db.collection(this.collection);
      const queryRef = firestoreRef;
      await queryRef.get().then(async (querySnapshot) => {
        const matchedDocs = querySnapshot.size;
        if (matchedDocs === 0) {
          for (const product of this.setItems) {
            await db.collection(this.collection).doc().set(product)
          }
          this.itemsLoaded = true;
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  async getProducts() {
    try {
      const products = [];
      await db.collection(this.collection).get().then(data => data.docs.map(el => products.push(el.data())));
      return products;
    } catch (error) {
      console.log(error);
    }
  };

  async getProductById(id) {
    try {
      let re;
      const firestoreRef = db.collection(this.collection);
      const queryRef = firestoreRef.where('id', '==', Number(id));
      await queryRef.get().then((querySnapshot) => {
        const matchedDocs = querySnapshot.size;
        if (matchedDocs) {
          querySnapshot.docs.forEach(doc => {
            re = doc.data();
          })
        } else {
          console.log('0 documents matched the query');
        }
      });
      return re;
    } catch (error) {
      console.log(error);
    }
  };

  // ARREGLAR DUPLICADO DE IDS AL MOMENTO DE INSERTAR
  async saveProduct(product) {
    try {
      await db.collection(this.collection).doc().set(product);
      return 'Operacion exitosa';
    } catch (error) {
      console.log(error);
    }
  };

  // ARREGLAR CONTROL DE ERRORES
  async updateProduct(id, product) {
    try {
      const firestoreRef = db.collection(this.collection);
      const docRef = firestoreRef.where('id', '==', Number(id));
      await docRef.get().then((querySnapshot) => {
        querySnapshot.forEach(async doc => {
          await doc.ref.update(product);
        })
      });
    } catch (error) {
      console.log(error);
    }
  };

  // ARREGLAR CANTIDAD DE VECES ELIMINAR
  async deleteProduct(id) {
    try {
      const firestoreRef = db.collection(this.collection);
      const docRef = firestoreRef.where('id', '==', Number(id));
      await docRef.get().then((querySnapshot) => {
        querySnapshot.forEach(doc => {
          doc.ref.delete();
        })
      });
      return 'Producto eliminado'
    } catch (error) {
      console.log(error);
    }
  };
};

export default new Productos("Productos", items);
