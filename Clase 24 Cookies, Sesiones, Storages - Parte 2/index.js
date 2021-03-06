const express = require('express');
let expressSession = require("express-session");
const ApiHandler = require("./apiHandler");
const { Server: HttpServer } = require("http");
const { Server: IoServer } = require("socket.io");
const cors = require("cors");
const app = express();
const PORT = 8080;
let path = require("path");
let passport = require("passport");
let passportStrategy = require('passport-local').Strategy;
let usuarios = [];
const ApiController = new ApiHandler();

// M I D D L E W A R E S
app.use(cors('*'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
passport.use('login', new passportStrategy((username, password, done) => {
    let user = usuarios.find(usuario => usuario.username == username);

    if (!user) return done(null, false);

    if (user.password != password) return done(null, false);

    user.contador = 0;

    return done(null, user);
}));
passport.use('register', new passportStrategy({
    passReqToCallback: true
}, (req, username, password, done) => {
    let { direccion } = req.body;

    let userfind = usuarios.find(usuario => usuario.username == username);

    if (userfind) return done("Already redistered!");

    let user = {
        username,
        password,
        direccion
    }
    usuarios.push(user);

    return done(null, user);

}));
app.use(expressSession({
    secret: "secret123",
    cookie: {
        httpOnly: false,
        secure: false,
        maxAge: 60000
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
    done(null, user.username);
})
passport.deserializeUser((username, done) => {
    let user = usuarios.find(usuario => usuario.username == username);
    done(null, user);
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

app.post('/login', passport.authenticate('login', { failureRedirect: 'registro', successRedirect: 'datos' }));


app.get('/datos', isAuth, (req, res, next) => {
    if (!req.user.contador) {
        req.user.contador = 1
    } else {
        req.user.contador++;
    }
    res.render('datos', {
        data: ApiController.getProductos(),
        contador: req.user.contador,
        usuario: req.user
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
