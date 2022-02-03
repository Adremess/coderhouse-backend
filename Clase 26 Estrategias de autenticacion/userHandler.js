const { mongoose } = require("./config/config.js");
const UserSchema = require("./config/schema.js");

class Usuarios {
  constructor(tabla) {
    this.table = tabla;
  }

  async saveUser({ username, password, direccion }) {
    const usuario = new UserSchema({
      user: username,
      password: password,
      email: direccion
    });
    await usuario.save();
  }

  async existUser(usr) {
    const model = mongoose.model(this.table);
    const user = await model.find({ user: usr });
    if (user.length === 0 ) return false;
    return user;
  };

};

module.exports = new Usuarios('Usuarios');
