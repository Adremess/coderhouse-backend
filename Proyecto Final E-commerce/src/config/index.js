require("dotenv").config();

const db = {
  db_uri: process.env.MONGO_ATLAS_URI,
};

const jwt = {
  private_key: process.env.PRIVATE_KEY,
}

const config = {
  port: process.env.PORT || 5000,
}

module.exports = { db, jwt, config };
