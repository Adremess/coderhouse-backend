require("dotenv").config();

const db = {
  db_uri: process.env.MONGO_ATLAS_URI,
};

const jwt_key = {
  private_key: process.env.JWT_KEY,
}

const config = {
  port: process.env.PORT || 5000,
}

module.exports = { db, jwt_key, config };
