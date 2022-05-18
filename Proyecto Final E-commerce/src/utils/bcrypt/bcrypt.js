const bcrypt = require("bcrypt");

class Bcrypt {
  async createHash(pw) {
    return bcrypt.hashSync(pw, bcrypt.genSaltSync(10), null);
  }

  async verifyHash(pw, userPw) {
    return await bcrypt.compare(pw, userPw);
  }
}

module.exports = new Bcrypt();
