const helpers = {};
var _ = require('lodash');

helpers.isAuthenticated = (req, res, next) => {
 
 /*  if (req.isAuthenticated()) {
    return next();
  }  */
  return next()

  req.flash('error', 'Debes iniciar sesion para acceder a los datos');
  req.session.Redirect=req.url
  res.redirect('/users/login'); 
};


helpers.validatePermision = (req, res, next) => {
  var r=_.find(req.app.locals.routs,{rout:req.originalUrl})
  if (r != undefined) {
    return next()
  } 
    req.flash('error', 'No tienes permisos para acceder a esta ruta');
    
    res.render('partials/page_not_found'); 
  };
  

module.exports = helpers;
