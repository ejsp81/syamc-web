const alliedEntityCtrl = {};
var AlliedEntity = require('../models/alliedEntity')
const GeneralCrud = require('../provider/general_crud');
var generalCrud = new GeneralCrud('alliedEntity')
var utilfull = require('../helpers/utilfull');
const nameTabla = AlliedEntity.prototype.name(true)

alliedEntityCtrl.index = (req, res) => {
  req.app.locals.lastUrl = req.url
  var ex = new AlliedEntity({
    serviceProvide:'serviceProvide',
    businessActivity:'businessActivity',
    celphon1:'celphon1',
    celphon2:'celphon2',
    documentReference:'documentReference',
    location:'location',
    manager:'manager',
    phone1:'phone1',
    phone2:'phone2',
    description:'description',
    urlPageWeb:'urlPageWeb',
    urlLogo:'urlLogo',userAccount:'urlLogo',

  })
  req.app.locals.fieldAndTitle = utilfull.fieldAndTitle({
    model: AlliedEntity,
    except: Object.values(ex)
  })
  res.render('allied_entity/index', {
    title: 'Administrar Aliados',
    titleDataTable: 'Lista de Aliados',
    view: 'index',
    urlPage: utilfull.returnUrl(req.originalUrl),
    nameTabla
  });
};

alliedEntityCtrl.renderIndex = async (req, res) => {
  req.app.locals.fieldAndTitle = utilfull.fieldAndTitle({
    model: AlliedEntity,
  })
  const { view } = req.params
  var title = 'Pagina no Encontrada'
  console.log(req.app.locals.businessActivity)
  console.log('Hola como te va')
  var rowData
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
    const query2 = await generalCrud._getRowsByParam('parameter', 'serviceProvide', '==')
    if (query2.success) {
      query2.data.forEach(doc => {
        let document = doc.data()
        req.app.locals.serviceProvide = utilfull.arrayToJson(document.value);
      });
    } else {
      console.log('error')
    }
  }
  if (view == 'create') {
    title = 'Formulario para crear un nuevo aliado'
  } else {
    const { getById } = alliedEntityCtrl;
    rowData = await getById(req, res)
    if (view == 'edit') {
      title = 'Formulario para modificar un aliado'
    } else if (view == 'createUser') {
      req.app.locals.fieldAndTitle = {
        displayName: 'Nombre',
        email: 'Correo Electronico',
        disabled: 'Estado',
        profile: 'Perfil',
        idBD:'Id Base de datos'
      }
      rowData.displayName = rowData.businessName
      title = 'Formulario para asignar usuario al aliado'
      req.app.locals.urlReturn = '/allied_entity'
    }
  }
  console.log('33333333333333333333333333......')
  console.log(rowData)
  res.render('allied_entity/index', { title, view, rowData, urlPage: utilfull.returnUrl(req.originalUrl), nameTabla });
};

alliedEntityCtrl.getById = async (req, res) => {
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

alliedEntityCtrl.getAll = async (req, res) => {
  const query = await generalCrud._getAll()
  var data = []
  if (query.success) {
    query.data.forEach(doc => {
      let document = doc.data()
      document.id = doc.id
      data.push(document)
    });
    res.send(data)
  } else {

  }
};

alliedEntityCtrl.create = async (req, res) => {
  const form = JSON.parse(JSON.stringify(req.body))
  const info = AlliedEntity.prototype.modelObject.bind(form)()
  const query = await generalCrud._create(info)
  if (query.success) {
    req.flash('success', 'Aliado creado satisfactoriamente')
    res.redirect('/allied_entity')
  } else {

  }
}

alliedEntityCtrl.update = async (req, res) => {
  const form = JSON.parse(JSON.stringify(req.body))
  const info = utilfull.dropUndefined(AlliedEntity, form)
  const query = await generalCrud._updateById(req.body.id, info)
  if (query.success) {
    req.flash('success', 'Aliado actualizado satisfactoriamente')
    res.redirect('/allied_entity')
  } else { }
}

alliedEntityCtrl.deleteItem = async (req, res) => {
  const query = await generalCrud._deleteById(req.body.idProducto)
  if (query.success) {
    req.flash('success', 'Aliado Eliminado satisfactoriamente')
    res.redirect('/allied_entity')
  } else {

  }
}

alliedEntityCtrl.renderCreateUser = async (req, res) => {
  const { view } = req.params
  var alliedEntity
  if (view == 'create') {
    title = 'Formulario para crear un nuevo aliado'
  } else if (view == 'edit') {
    const { getById } = alliedEntityCtrl;
    alliedEntity = await getById(req, res)
    title = 'Formulario para modificar un aliado'
  }
  res.render('allied_entity/index', { title, view, alliedEntity });
};



module.exports = alliedEntityCtrl;