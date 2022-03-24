const dotenv = require("dotenv").config();
const express = require('express');
let expressSession = require("express-session");
const ApiHandler = require("./controllers/apiHandler");
const { Server: HttpServer } = require("http");
const { Server: IoServer } = require("socket.io");
const cors = require("cors");
let path = require("path");
let passport = require("passport");
const userHandler = require("./controllers/userHandler.js");
const args = require("./utils/arguments/args.js");
let cluster = require("cluster");
let compression = require("compression");
const numCPUs = require("os").cpus().length;
const app = express();
const PORT = parseInt(process.env.watch) || args.PORT || 8080;
const ApiController = new ApiHandler();
const modo_cluster = args.MODO;
const notFound = require("./routes/not-found.js");
let serverRoutes = require("./routes/routes");


// M I D D L E W A R E S
app.use(cors('*'));
app.use(express.json());
app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(expressSession({
  secret: "secret123",
  cookie: {
    httpOnly: false,
    secure: false,
    maxAge: 600000
  },
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());

// S E T T I N G S
app.engine('html', require('ejs').renderFile)
app.set("views", path.join(__dirname, 'views', 'ejs'))
app.set('view engine', 'html');

// R O U T E S

serverRoutes(app);
app.use(notFound);

// S O C K E T S
let httpServer = new HttpServer(app);
let io = new IoServer(httpServer);

io.on('connection', async socket => {
  socket.on('getProducts', async () => {
    io.sockets.emit('productList', ApiController.getProductos());
  })
  socket.on('newProduct', () => {
    console.log('new Product added');
    io.sockets.emit('productList', ApiController.getProductos());
  });
})

if (modo_cluster === 'CLUSTER' && cluster.isMaster) {
  console.log(`Master PID -> ${process.pid}`);

  // Workers
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
} else {
  httpServer.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
}
