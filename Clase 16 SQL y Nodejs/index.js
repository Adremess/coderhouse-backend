const express = require("express");
const path = require("path");
const { engine } = require("express-handlebars");
const Handlebars = require("express-handlebars");
const { Server: HttpServer } = require("http");
const { Server: IoServer } = require("socket.io");
const ApiHandler = require("./apiHandler");
const ChatHandler = require("./chatHandler");
const cors = require("cors");

const db_obj = require("./db/mariadb");
const db = db_obj.client;

const PORT = 3000;
const app = express();
const ApiController = new ApiHandler("productos");
const ChatController = new ChatHandler("mensajes");
const hbs = Handlebars.create({});

// S E T T I N G S
app.engine("handlebars", engine({
  extname: "hbs",
  defaultLayout: "",
  layoutDir: "",
}));

// H E L P E R S
// hbs.handlebars.registerHelper('checklength', function (v1, v2, options) {
//   'use strict';
//      if (v1.length>v2) {
//        return options.fn(this);
//     }
//     return options.inverse(this);
//   });

app.use(cors('*'));

app.set("views", path.join(__dirname, 'views'));
app.set("view engine", "handlebars");
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

(async () => {
  try {
    let response = await db.from("articulos");
    console.log(Object.keys(response));
  } catch (error) {
    console.log(error);
  }
});

// E N D P O I N T S
app.get('/', async (req, res) => {
  res.render("form", { data: await ApiController.getProductos() });
});

app.get('/productos', async (req, res) => {
  let data = await ApiController.getProductos();
  res.render("historial", { data });
});

app.post('/productos', (req, res) => {
  ApiController.addProduct(req.body);
  res.redirect('/');
});

app.put('/productos/:id', async (req, res) => {
  res.json(await ApiController.updateProductById(req.body, req.params.id));
});


// S O C K E T S
let httpServer = new HttpServer(app);
let io = new IoServer(httpServer);

io.on('connection', async socket => {
  socket.emit('init', console.log(`Nuevo usuario conectado: ${socket.id}`));
  socket.on('getProducts', async () => {
    io.sockets.emit('productList', await ApiController.getProductos());
  })
  socket.on('newProduct', () => {
    io.sockets.emit('productList', ApiController.getProductos());
  });
  let chat = await ChatController.getMessages();
  socket.on('chatMsg', async ({email, date, msg}) => {
    await ChatController.addChatMsg({ email, date, msg });
    chat = await ChatController.getMessages();
    io.sockets.emit('newMsg', chat);
  });
  io.sockets.emit('newMsg', chat);
})

httpServer.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
