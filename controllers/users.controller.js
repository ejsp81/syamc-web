const usersCtrl = {};
const adminBD = require('../config/firebase_admin');
const userService = require("../config/user_service");
const GeneralCrud = require('../provider/general_crud');
var generalCrud = new GeneralCrud('alliedEntity')
var utilfull = require('../helpers/utilfull');

// Modules
const passport = require("passport");

usersCtrl.renderLoginForm = (req, res) => {
  res.render("login", { title: 'Inicio de Sesion' });
};

usersCtrl.login = passport.authenticate("login", {
  successRedirect: "/",
  failureRedirect: "/users/login",
  failureFlash: true,
  successFlash: true,
});



usersCtrl.renderSingUpForm = (req, res) => {
  res.render("user/create", { title: 'Creacion de Usuarios' });
};


usersCtrl.index = (req, res) => {
  req.app.locals.fieldAndTitle = {
    displayName: 'Nombre',
    email: 'Correo Electronico',
    disabled: 'Estado',
    customClaims: 'Perfil'
  }
  res.render('user/index', {
    title: 'Administrar Usuarios',
    titleDataTable: 'Lista de Usuarios',
    view: 'index',
    urlPage: utilfull.returnUrl(req.originalUrl)
  });
};

usersCtrl.renderIndex = async (req, res) => {
  req.app.locals.fieldAndTitle = {
    displayName: 'Nombre',
    email: 'Correo Electronico',
    profile: 'Perfil',
  }
  var title = 'Pagina no Encontrada'
  var rowData
  const { view } = req.params
  if (view == 'create') {
    title = 'Formulario para crear un usuario del sistema'
  } else {
    const { getByUId } = usersCtrl;
    rowData = await getByUId(req, res)
    title = 'Formulario para modificar un usuario del sistema'
  }
  req.app.locals.urlReturn = '/users'
  res.render('user/index', { title, view, rowData, urlPage: utilfull.returnUrl(req.originalUrl) });
};

usersCtrl.getByUId = async (req, res) => {
  console.log(req.params)
  user = await userService.getUserByUid(req.params.id)
  if (user.success) {
    return user.data
  } else {
    return null
  }
};

usersCtrl.getUsers = (req, res, next) => {
  const maxResults = 100; // optional arg.
  let usuarios = []
  adminBD.auth().listUsers(maxResults).then((userRecords) => {
    userRecords.users.forEach(function (user) {
      //if(user.customClaims!=undefined){
      usuarios.push(user.toJSON())
      //}

    });
    console.log(usuarios)
    res.send(usuarios);
  }).catch((error) => console.log(error));

};

usersCtrl.createAllied = async (req, res) => {
  user = await userService.getUserByEmail(req.body.email)
  if (user.success) {
    console.log('User already exists');
    req.flash('error', 'El correo digitado ya se encuentra creado')
    res.redirect('/users/render/create')
  } else {
    switch (user.data) {
      case 'auth/user-not-found':
        var newUser = await userService.createUser(req.body)
        if (newUser.success) {
          const query = await generalCrud._updateById(req.body.id, {
            userAccount: true
          })
          req.flash('success', 'Aliado credo satisfactoriamente')
          res.redirect('/users')
        } else {
          req.flash('error', 'Ha ocurrido un error inesperado ' + newUser.data)
          res.redirect('/users/render/create');
        }
        break;
      default:
        req.flash('error', 'Ha ocurrido un error inesperado..' + newUser.data)
        res.redirect('/users/render/create');
        break;
    }
  }
}

usersCtrl.edit = async (req, res) => {
  console.log(req.body)
  var newUser = await userService.updateUser(req.body)
  if (newUser.success) {
    req.flash('success', 'Aliado editado satisfactoriamente')
    res.redirect('/users')
  } else {
    req.flash('error', 'Ha ocurrido un error inesperado ' + newUser.data)
    res.redirect('/users/render/edit');
  }
};

usersCtrl.logout = (req, res) => {
  req.logout();
  req.flash("success", "Has cerrado sesion.");
  res.redirect("/users/login");
};

module.exports = usersCtrl;