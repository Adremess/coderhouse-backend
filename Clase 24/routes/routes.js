const express = require("express");
const app = express();
const router = express.Router();


let expressSession = require("express-session");
let passport = require("passport");
let passportStrategy = require("passport-local");
let usuarios = [];


passport.use('login', new passportStrategy((username, password, done)=>{
  let user = usuarios.find( usuario => usuario.username == username);

  if(!user) return done(null, false);

  if(user.password != password) return done(null, false);

  user.contador = 0;

  return done(null, user);
}));

passport.use('register', new passportStrategy({
  passReqToCallback: true
},(req, username, password, done)=>{
  let { direccion } = req.body;

  let userfind = usuarios.find( usuario => usuario.username == username);

  if(userfind) return done("Already redistered!");

  let user = {
      username,
      password,
      direccion
  }
  usuarios.push(user);

  return done(null, user);

}));

passport.serializeUser((user, done)=>{
  done(null, user.username);
})

passport.deserializeUser((username, done)=>{
  let user = usuarios.find( usuario => usuario.username == username);
      done(null, user);
})

app.use(expressSession({
  secret: "secret123",
  cookie:{
      httpOnly: false,
      secure: false,
      maxAge: 60000
  },
  resave:false,
  saveUninitialized:false
}))


app.use(passport.initialize());
app.use(passport.session());


let isAuth = (req, res, next) =>{
  if(req.isAuthenticated()){
     return next();
  }
  res.redirect('/login');
}

let isNotAuth = (req, res, next) =>{
  if(!req.isAuthenticated()){
      next();  
  }else{        
      res.redirect('/datos');
  }
}


// R O U T E S

router.get('/', (req, res, next) => {
  let routes = { login: 'login', datos: '/datos'};
    let path_to = '';
    req.isAuthenticated() ? path_to = routes.datos : path_to = routes.login;
    res.redirect(path_to);
});

router.get('/registro', isNotAuth, (req, res, next)=>{
  res.render('registro');
})

router.get('/login',  (req, res, next)=>{
  res.render('login');
})

router.post('/login', passport.authenticate('login', {failureRedirect: 'registro', successRedirect:'datos'}));


router.get('/datos', isAuth, (req, res, next)=>{
    if(!req.user.contador){
        req.user.contador = 1
    }else{        
        req.user.contador++;
    }
    res.render('datos', {
        contador: req.user.contador,
        usuario: req.user
    });
})

router.get('/logout', (req, res, next)=>{
    req.session.destroy( err =>{
        if(err) res.send(JSON.stringify(err));
        res.redirect('login');
    })
});

module.exports = router;
