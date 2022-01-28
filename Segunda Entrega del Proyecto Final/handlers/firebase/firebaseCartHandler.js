import db from "../../utils/firebase/index.js";
import Productos from "../firebase/firebasedbHandler.js";

class Carrito {
  constructor(cart) {
    this.cart = cart;
    this.currentCart = 1;
  }

  async createCart() {
    try {
      let date = new Date(Date.now());
      const cart = {
        timestamp: `${date.toLocaleString()}`,
        productos: []
      };
      let firestoreRef = db.collection(this.cart);
      let queryRef = firestoreRef;
      await queryRef.get().then(async (querySnapshot) => {
        const matchedDocs = querySnapshot.size;
        if (matchedDocs === 0) {
          cart.id = 1;
          this.currentCart = cart.id;
          console.log(this.currentCart);
          await db.collection(this.cart).doc().set(cart);
          return `Carrito con id ${cart.id} creado.`;
        }
        console.log('existe carrito');
        let lastId = 1;
        querySnapshot.docs.forEach(el => {
          let carrito = el.data();
          let currentId = carrito.id;
          if (currentId > lastId) lastId = currentId;
        });
        cart.id = lastId + 1;
        await db.collection(this.cart).doc().set(cart);
        return `Carrito con id ${cart.id} creado.`;
      }).catch(err => console.log(err));
    } catch (err) {
      return console.log(err);
    }
  }

  async deleteCart(id) {
    try {
      let deleted = false;
      const firestoreRef = db.collection(this.cart);
      const docRef = firestoreRef.where('id', '==', Number(id));
      await docRef.get().then((querySnapshot) => {
        const matchedDocs = querySnapshot.size;
        querySnapshot.forEach(doc => {
          doc.ref.delete();
          deleted = true;
        })
      });
      if (deleted) return `Borrado carrito de id ${id} con exito.`
      return `Error en borrado de carrito con id ${id}`;
    } catch (error) {
      console.log(error);
    }
  };

  async getCartProducts(id) {
    try {
      let firestoreRef = db.collection(this.cart);
      let docRef = firestoreRef.where('id', '==', Number(id));
      let cartProducts = [];
      await docRef.get().then(async querySnapshot => {
        querySnapshot.forEach(async doc => {
          let cart = doc.data();
          cart.productos.forEach(async prod => {
            cartProducts.push(await prod);
          })
        });
      });
      return cartProducts;
    } catch (error) {
      console.log(error);
    }
  };

  async addCartProduct(id) {
    try {
      let producto = Productos.getProductById(id);
      const firestoreRef = db.collection(this.cart);
      const docRef = firestoreRef.where('id', '==', Number(this.currentCart));
      await docRef.get().then(async (querySnapshot) => {
        const matchedDocs = querySnapshot.size;
        if (matchedDocs === 1) {
          querySnapshot.forEach(async doc => {
            let cart = doc.data();
            await cart.productos.push(await producto.then(data => data));
            await doc.ref.update(cart);
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  async deleteById(idCart, idProd) {
    try {
      const firestoreRef = db.collection(this.cart);
      const docRef = firestoreRef.where('id', '==', Number(idCart));
      await docRef.get().then(async querySnapshot => {
        querySnapshot.forEach(async doc => {
          let cart = doc.data();
          cart.productos = cart.productos.filter(prod => prod.id !== Number(idProd))
          await doc.ref.update(cart);
        });
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export default new Carrito('Carrito');
