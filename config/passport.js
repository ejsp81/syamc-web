const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GeneralCrud = require('../provider/general_crud');
var generalCrud = new GeneralCrud('profile')
const userService = require("./user_service");

passport.use('login', new LocalStrategy({
  usernameField: 'email',
  passReqToCallback: true,
}, async (req, email, password, done) => {
  user = await userService.authenticate(email, password);
  

  if (user == null) {
    return done(null, false, { message: 'Usuario o contraseña incorrecto' });
  } else {    
    user = (await userService.customClaim()).claims
    if (user.profile != undefined) {
      req.app.locals.rol=user.profile
      var data=[]
      const query=await generalCrud._getAll()
      if (query.success) {
        query.data.forEach(doc => {
          let document = doc.data()
          data.push(document)
        });
        req.app.locals.profile=data
      } else {
        req.app.locals.profile=null  
      }
           
    }
    var name=user.name
    console.log(user)
    req.app.locals.currentUser = user
    //user=JSON.parse(JSON.stringify(userService.customClaim()))
    req.flash('user', user)
    return done(null, user, { message: 'Bienvenido '+name });
  }
}));


passport.serializeUser((user, done) => {
  done(null, user.user_id);
});

passport.deserializeUser((id, done) => {
  const user = userService.customClaim()
  done(null, id);
});