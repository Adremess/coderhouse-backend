require("dotenv").config();
const PORT = process.argv[2] ? process.argv[2] : 3000;

const db = {
  db_uri: process.env.MONGO_ATLAS_URI,
};

const jwt_key = {
  private_key: process.env.JWT_KEY,
};

const config = {
  port: PORT,
};

module.exports = { db, jwt_key, config };
