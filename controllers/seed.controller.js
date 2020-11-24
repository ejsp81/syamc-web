const seedController = {};
var AlliedEntity = require('../models/alliedEntity')
const GeneralCrud = require('../provider/general_crud');

var utilfull = require('../helpers/utilfull');
var listSeed = require('../helpers/seeds/seed')

seedController.index = (req, res) => {
  req.app.locals.fieldAndTitle = {
    table: 'Tabla',
		description: 'Descripcion',
		action:'Accion'
  }
  res.render('seeds/index', {
    title: 'Resetear Coleccions de la base de datos',
    view: 'index',
    urlPage:utilfull.returnUrl(req.originalUrl)
  });
};

seedController.token = (req, res) => {
  userService.tokenUsuario()
}

seedController.renderIndex = async (req, res) => {
  req.app.locals.fieldAndTitle = utilfull.fieldAndTitle({
    model: AlliedEntity,
  })
  const { view } = req.params
  var title = 'Pagina no Encontrada'
  console.log(req.app.locals.businessActivity)
  var alliedEntity
  if (typeof req.app.locals.businessActivity == 'undefined') {
    var generalCrud = new GeneralCrud('parametersApp')
    const query = await generalCrud._getRowsByParam('parameter', 'businessActivity', '==')
    if (query.success) {
      query.data.forEach(doc => {
        let document = doc.data()
        req.app.locals.businessActivity = utilfull.arrayToJson(document.value);
      });
    } else {
      console.log('error')
    }
  }
  if (view == 'create') {
    title = 'Formulario para crear un nuevo aliado'
  } else {
    const { getById } = seedController;
    alliedEntity = await getById(req, res)
    if (view == 'edit') {
      title = 'Formulario para modificar un aliado'
    } else if (view == 'createUser') {
      req.app.locals.fieldAndTitle = {
        displayName: 'Nombre',
        email: 'Correo Electronico',
        disabled: 'Estado',
        profile: 'Perfil'
      }
      alliedEntity.displayName = alliedEntity.businessName
      title = 'Formulario para asignar usuario al aliado'
      req.app.locals.urlReturn = '/allied_entity'
    }
  }
  res.render('allied_entity/index', { title, view, alliedEntity,urlPage:utilfull.returnUrl(req.originalUrl) });
};

seedController.getById = async (req, res) => {
  console.log(req.params.id)
  const query = await generalCrud._getById(req.params.id)
  if (query.success) {
    let document = query.data.data();
    document.id = query.data.id
    return document
  } else {
    console.log('error')
  }
};

seedController.getAll = async (req, res) => {

  res.send(listSeed)
};

seedController.updateCollection = async (req, res) => {
	var generalCrud = new GeneralCrud(req.body.table)
  const query = await generalCrud._resetCollection(req.body.data)
}

seedController.update = async (req, res) => {
  /* let AlliedEntityRef = await db.collection('alliedEntity').doc('gSwR5FjzKr0wYLemqWB0').get()
    .then((document) => {
      console.log(typeof document.ref)
      //console.log(document.ref)
      var i=moment()
      var f=i.clone().add(5,'days')
      let museums = db.collection('schedule')
        .where("date", ">=", i)
        .where("date", "<=", f)
        .where('alliedEntity', '==', document.ref)


      museums.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          var info = doc.data()
          console.log('-----------------------------------------------------------------------');
          console.log('Fecha', ' => ', moment(info.date.toDate()).format('DD/MM/YYYY'));
          console.log('Hora', ' => ', moment(info.date.toDate()).format('HH:mm'));

        });
      });
    }) */
  const form = JSON.parse(JSON.stringify(req.body))
  const info = AlliedEntity.prototype.modelAlliedEntity.bind(form)()
  const query = await generalCrud._updateById(req.body.id, info)
  if (query.success) {
    req.flash('success', 'Aliado actualizado satisfactoriamente')
    res.redirect('/allied_entity')
  } else {

  }
}

seedController.deleteItem = async (req, res) => {
  const query = await generalCrud._deleteById(req.body.idProducto)
  if (query.success) {
    req.flash('success', 'Aliado Eliminado satisfactoriamente')
    res.redirect('/allied_entity')
  } else {

  }
}

seedController.renderCreateUser = async (req, res) => {
  const { view } = req.params
  var alliedEntity
  if (view == 'create') {
    title = 'Formulario para crear un nuevo aliado'
  } else if (view == 'edit') {
    const { getById } = seedController;
    alliedEntity = await getById(req, res)
    title = 'Formulario para modificar un aliado'
  }
  res.render('allied_entity/index', { title, view, alliedEntity });
};



module.exports = seedController;