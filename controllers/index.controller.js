const indexCtrl = {};
var profile
var _ = require('lodash');

indexCtrl.renderIndex = (req, res) => {
  if (process.env.NODE_ENV =='development'){
    profile = require('../helpers/seeds/profile')
    var rol='Administrador'
  } else {
    profile = req.app.locals.profile
    rol=req.app.locals.rol
  }
  var permission=_.filter(profile,{profile:rol,fatherMenu:'menu'})  
  var perfil={}
  permission.forEach(function(val){
    perfil[val.keyMenu]={
      menu:val.valueMenu,
      submenu:_.filter(profile,{profile:rol,fatherMenu:val.keyMenu})}
  })
  req.app.locals.permission=perfil
  req.app.locals.routs=_.filter(profile,{profile:rol})
  res.render('index',{title:'Servicio y Asistencia para Motos y Carros'});
};

module.exports = indexCtrl;