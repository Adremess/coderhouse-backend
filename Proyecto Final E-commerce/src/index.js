const express = require("express");
const CORS = require("cors");
const routes = require("./routes/index");
const { config } = require("./config");
const { ConnectDB } = require("./dto");
const path = require("path");
const cookieParser = require("cookie-parser");

class Server {
  constructor() {
    this.app = express();
    this.db = ConnectDB;
    this.Settings();
    this.Views();
    this.ConnectDB;
    this.db();
  }

  Settings() {
    this.app.use(cookieParser());
    this.app.use(express.json());
    this.app.use(CORS('*'));
    this.app.use(express.urlencoded({ extended: false }))
    this.app.use(express.static(process.cwd() + '/src/assets'));
  }

  Routes() {
    routes(this.app);
  }

  Views() {
    this.app.set('views', path.join(__dirname, 'views', 'ejs'));
    this.app.set('view engine', 'ejs');
  }

  ServerUp() {
    this.app.listen(config.port, (err) => {
      if (!err) {
        console.log(`Server up and running http://localhost:${config.port}`);
      } else {
        throw new Error('Error al levantar el servidor.');
      }
    })
  }
}

module.exports = new Server();
