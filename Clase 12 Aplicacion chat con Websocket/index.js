const express = require("express");
const path = require("path");
const { engine } = require("express-handlebars");
const Handlebars = require("express-handlebars");
const { Server: HttpServer } = require("http");
const { Server: IoServer } = require("socket.io");
const ApiHandler = require("./apiHandler");

const PORT = 3000;
const app = express();
const ApiController = new ApiHandler();
const hbs = Handlebars.create({});

// S E T T I N G S
app.engine("handlebars", engine({
  extname: "hbs",
  defaultLayout: "",
  layoutDir: "",
}));

// H E L P E R S
hbs.handlebars.registerHelper('checklength', function (v1, v2, options) {
  'use strict';
     if (v1.length>v2) {
       return options.fn(this);
    }
    return options.inverse(this);
  });

app.set("views", path.join(__dirname, 'views'));
app.set("view engine", "handlebars");
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// E N D P O I N T S
app.get('/', (req, res) => {
  res.render("form", { data: ApiController.getProductos() });
});

app.get('/productos', (req, res) => {
  res.render("historial", { data: ApiController.getProductos() });
});

app.post('/productos', (req, res) => {
  ApiController.addProduct(req.body);
  res.redirect('/');
});


// S O C K E T S
let httpServer = new HttpServer(app);
let io = new IoServer(httpServer);

let chat = [];

io.on('connection', socket => {
  socket.emit('init', console.log(`Nuevo usuario conectado: ${socket.id}`));
  socket.on('getProducts', () => {
    io.sockets.emit('productList', ApiController.getProductos());
  })
  socket.on('newProduct', () => {
    io.sockets.emit('productList', ApiController.getProductos());
  });
  socket.on('chatMsg', ({email, msg}) => {
    chat.push({
      email,
      msg
    });
    io.sockets.emit('newMsg', chat);
  });
  io.sockets.emit('newMsg', chat);
})

httpServer.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
