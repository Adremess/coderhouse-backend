const jwt = require("jsonwebtoken");

class JWT {
  constructor() {
    this.Jwt = jwt;
  }
  verifyToken(user) {};

  createToken(user) {};
};

module.exports = new JWT();
