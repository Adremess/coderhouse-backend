const bcrypt = require("bcrypt");

class Bcrypt {
  constructor() {
    this.salt = await bcrypt.genSalt(10);
  }

  createHash(pw) {
    const password = await bcrypt.hash(pw, this.salt);
    return password;
  }

  verifyHash(pw, userPw) {
    const validation = await bcrypt.compare(pw, userPw);
    return validation;
  }
}

module.exports = new Bcrypt();
