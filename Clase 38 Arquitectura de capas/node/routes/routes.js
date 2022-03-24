
const { infoRoute } = require("../utils/logger/loggers.js");
let passport = require("passport");
let passportStrategy = require('passport-local').Strategy;
const args = require("../utils/arguments/args.js");
const PORT = parseInt(process.env.watch) || args.PORT || 8080;


module.exports = app => {
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
  app.get('/registro', infoRoute, isNotAuth, (req, res, next) => {
    res.render('registro');
  })
  
  app.post('/registro', passport.authenticate('register', { failureRedirect: 'registro-error', successRedirect: 'datos' }));
  
  app.get('/', infoRoute, (req, res, next) => {
    let routes = { login: 'login', datos: '/datos' };
    let path_to = '';
    req.isAuthenticated() ? path_to = routes.datos : path_to = routes.login;
    res.redirect(path_to);
  })
  
  app.get('/login', infoRoute, (req, res, next) => {
    console.log(`login ${PORT}`);
    res.render('login');
  })
  
  app.post('/login', passport.authenticate('login', { failureRedirect: 'login-error', successRedirect: 'datos' }));
  
  
  app.get('/datos', infoRoute, isAuth, (req, res, next) => {
    res.render('datos', {
      data: ApiController.getProductos(),
      usuario: req.user[0]
    });
  })
  
  app.get('/logout', infoRoute, (req, res, next) => {
    req.session.destroy(err => {
      if (err) res.send(JSON.stringify(err));
      res.render('logout', {
        usuario: req.user
      });
    })
  })
  
  app.post('/productos', infoRoute, (req, res, next) => {
    ApiController.addProduct(req.body);
    res.redirect('/datos');
  });
  
  app.get('/login-error', infoRoute, (req, res, next) => {
    res.render('login-error');
  });
  
  app.get('/info', infoRoute, (req, res, next) => {
    let info = {
      procesadores: numCPUs,
      argv: process.argv.slice(2),
      platform: process.platform,
      version: process.version,
      memory: process.memoryUsage().rss,
      execPath: process.execPath,
      pid: process.pid,
      cwd: process.cwd()
    }
    // console.log(info);
    res.render('info', info);
  });
  
  app.get('/api/randoms', infoRoute, (req, res, next) => {
    cant = 0;
     req.query.cant ? cant = randoms(req.query.cant) : cant = randoms(100000000);
    res.render('randoms', { cant });
  });
};
