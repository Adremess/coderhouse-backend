const dotenv = require("dotenv").config();
const express = require('express');
let expressSession = require("express-session");
const ApiHandler = require("./apiHandler");
const { Server: HttpServer } = require("http");
const { Server: IoServer } = require("socket.io");
const cors = require("cors");
let path = require("path");
let passport = require("passport");
let passportStrategy = require('passport-local').Strategy;
const userHandler = require("./userHandler.js");
const args = require("./args.js");
const { fork } = require("child_process");
const app = express();
const PORT = args.PORT || 8080;
const ApiController = new ApiHandler();


// M I D D L E W A R E S
app.use(cors('*'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
passport.use('login', new passportStrategy(async (username, password, done) => {
  let user = await userHandler.existUser(username);
  if (!user) return done(null, false);
  if (!userHandler.compareHash(password, user[0].password)) return done(null, false);
  return done(null, user[0]);
}));
passport.use('register', new passportStrategy({
  passReqToCallback: true
}, async (req, username, password, done) => {
  let { direccion } = req.body;

  let userfind = await userHandler.existUser(username);

  if (userfind) return done("Already registered!");

  let user = {
    username,
    password,
    direccion
  }
  await userHandler.saveUser(user);

  return done(null, user);

}));
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
app.set("views", path.join(__dirname, 'views', 'ejs'))
app.set('view engine', 'ejs');
passport.serializeUser((user, done) => {
  done(null, user.user);
})
passport.deserializeUser(async (username, done) => {
  await userHandler.existUser(username).then(user => {
    done(null, user);
  });
})

// FN()
let isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

let isNotAuth = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/datos');
  }
}

// R O U T E S
app.get('/registro', isNotAuth, (req, res, next) => {
  res.render('registro');
})

app.post('/registro', passport.authenticate('register', { failureRedirect: 'registro-error', successRedirect: 'datos' }));

app.get('/', (req, res, next) => {
  let routes = { login: 'login', datos: '/datos' };
  let path_to = '';
  req.isAuthenticated() ? path_to = routes.datos : path_to = routes.login;
  res.redirect(path_to);
})

app.get('/login', (req, res, next) => {
  res.render('login');
})

app.post('/login', passport.authenticate('login', { failureRedirect: 'login-error', successRedirect: 'datos' }));


app.get('/datos', isAuth, (req, res, next) => {
  res.render('datos', {
    data: ApiController.getProductos(),
    usuario: req.user[0]
  });
})

app.get('/logout', (req, res, next) => {
  req.session.destroy(err => {
    if (err) res.send(JSON.stringify(err));
    res.render('logout', {
      usuario: req.user
    });
  })
})

app.post('/productos', (req, res, next) => {
  ApiController.addProduct(req.body);
  res.redirect('/datos');
});

app.get('/login-error', (req, res, next) => {
  res.render('login-error');
});

app.get('/info', (req, res, next) => {
  res.render('info', {
    argv: process.argv.slice(2),
    platform: process.platform,
    version: process.version,
    memory: process.memoryUsage(),
    execPath: process.execPath,
    pid: process.pid,
    cwd: process.cwd() 
  });
});

app.get('/api/randoms', (req, res, next) => {
  let randoms;
  if (req.query.cant) {
    randoms = fork("./randoms.js", [ req.query.cant ]);
  } else {
    randoms = fork("./randoms.js", [ 100000000 ]);
  }
  randoms.send('START');
  randoms.on('message', (message) => {
    res.render('randoms', { cant: message });
  });
});


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
httpServer.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
