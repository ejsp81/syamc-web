const generalInformationCtrl = {};
var moment = require('moment')
var GeneralInformation = require('../models/generalInformation')
const GeneralCrud = require('../provider/general_crud');
var generalCrud = new GeneralCrud(GeneralInformation.prototype.name())
var utilfull = require('../helpers/utilfull');
const nameTabla=GeneralInformation.prototype.name(true)

generalInformationCtrl.index = (req, res) => {
  console.log('***********************************')
  console.log(nameTabla)
  req.app.locals.lastUrl=req.url
  req.app.locals.fieldAndTitle = utilfull.fieldAndTitle({
    model: GeneralInformation,
  })
  res.render('general_information/index', {
    title: 'Administrar Precios de Informacion General',
    titleDataTable: 'Lista de Precios',
    view: 'index',
    urlPage:utilfull.returnUrl(req.originalUrl),
    nameTabla
  });
};

generalInformationCtrl.token = (req, res) => {
  userService.tokenUsuario()
}

generalInformationCtrl.renderIndex = async (req, res) => {
  req.app.locals.fieldAndTitle = utilfull.fieldAndTitle({
    model: GeneralInformation,
  })
  const { view } = req.params
  var title = 'Pagina no Encontrada'
  var rowData
  
  if (view == 'create') {
    title = 'Formulario para adicionar un producto'
  } else {
    const { getById } = generalInformationCtrl;
    rowData = await getById(req, res)
    if (view == 'edit') {
      title = 'Formulario para modificar un producto'
    }  
  }
  console.log(rowData)
  res.render('general_information/index', { 
    title, view, rowData ,
    urlPage:utilfull.returnUrl(req.originalUrl),
    nameTabla});
};

generalInformationCtrl.getById = async (req, res) => {
  console.log(req.params.id)
  const query = await generalCrud._getById(req.params.id)
  if (query.success) {
    let document = query.data.data();
    document.lastUpdate = moment(document.lastUpdate.toDate()).format('DD/MM/YYYY')
    document.id = query.data.id
    return document
  } else {
    console.log('error')
  }
};

generalInformationCtrl.getAll = async (req, res) => {
  const query = await generalCrud._getAll()
  var data = []
  if (query.success) {
    query.data.forEach(doc => {
      let document = doc.data()
      document.lastUpdate = moment(document.lastUpdate.toDate()).format('DD/MM/YYYY')
      document.id = doc.id
      data.push(document)
    });
    res.send(data)
  } else {

  }
};

generalInformationCtrl.create = async (req, res) => {
  const form = JSON.parse(JSON.stringify(req.body))
  const info = GeneralInformation.prototype.modelObject.bind(form)()
  const query = await generalCrud._create(info)
  if (query.success) {
    req.flash('success', 'Producto creado satisfactoriamente')
    res.redirect('/general_information')
  } else {

  }
}

generalInformationCtrl.update = async (req, res) => {  
  const form = JSON.parse(JSON.stringify(req.body))
  console.log(form)
  const info = utilfull.dropUndefined(GeneralInformation,form)
  console.log(info)
  const query = await generalCrud._updateById(req.body.id, info)
  if (query.success) {
    req.flash('success', 'Producto actualizado satisfactoriamente')
    res.redirect('/general_information')
  } else {}
}

generalInformationCtrl.deleteItem = async (req, res) => {
  const query = await generalCrud._deleteById(req.body.idRow)
  if (query.success) {
    req.flash('success', 'Producto Eliminado satisfactoriamente')
    res.redirect('/general_information')
  } else {

  }
}


module.exports = generalInformationCtrl;