const mongoose = require("mongoose");
const { db } = require("../config");

async function ConnectDB() {
  mongoose.connect(db.db_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, err => {
    if(err) throw new Error(`Error de conexion a la base de datos ${err}`)
    console.log('Base de datos conectada');
  });
}

module.exports = ConnectDB;
