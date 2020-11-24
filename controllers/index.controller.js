const indexCtrl = {};
var profile = require('../helpers/seeds/profile')
var _ = require('lodash');

indexCtrl.renderIndex = (req, res) => {
  var permission
  if (process.env.NODE_ENV =='development'){
    var rol='Administrador'
    permission=_.filter(profile,{profile:rol,fatherMenu:'menu'})    
  } else {
    permission=req.app.locals.profile
  }
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