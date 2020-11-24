var moment = require('moment')
var _ = require('lodash');
exports.converDate = function (date) {
  /* var array = date.split('/')  
  var parseDate = new Date(`${array[1]}/${array[0]}/${array[2]}`)
  return moment(parseDate) */
  return moment(date, ["DD/MM/YYYY"]);
}

exports.converArray = function (data) {
  return typeof data == 'string' ? [data] : data
}

/* exports.fieldAndTitle = (req, res, next) => {
 
    if (req.isAuthenticated()) {
      return next();
    } 
    return next()
    req.flash('error', 'Debes iniciar sesion para acceder a los datos');
    req.session.Redirect=req.url
    res.redirect('/users/login'); 
  }*/


exports.fieldAndTitle = function ({ model, except } = {}) {
  var object = model.prototype.fieldAndTitle()
  if (except != null) {
    except.forEach(function (name) {
      delete object[name];
    });
    return object
  } else {
    return object
  }
}

exports.arrayToJson = function (array) {
  var response = {}
  array.forEach(function (value) {
    response[value] = value
  })
  return response
}
exports.dropUndefined = function (object,data) {
  var response=object.prototype.modelObject.bind(data)()
  for(const i in response){
    if (response[i] == undefined){
      delete response[i]
    }
  }
  return response
}

exports.returnUrl = function (url) {
  var arrayUrl=url.split('/')
  return '/'+arrayUrl[1]
}