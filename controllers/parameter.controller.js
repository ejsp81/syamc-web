const parameterCtrl = {};
var ParametersApp = require('../models/parametersApp')
const GeneralCrud = require('../provider/general_crud');
const nameTabla=ParametersApp.prototype.name(true)
var generalCrud = new GeneralCrud('parametersApp')
var utilfull = require('../helpers/utilfull');


parameterCtrl.index = async(req, res) => {
  req.app.locals.lastUrl=req.url
  req.app.locals.fieldAndTitle ={
    index:'Item',
    field:'Descripcion'
  }
  const query = await generalCrud._getAll()
  var dataSelect = {}
  if (query.success) {
    query.data.forEach(doc => {
      let document = doc.data()
      dataSelect[doc.id]=document.description
    });
  } else {

  }
  res.render('parameter/index', {
    title: 'Administrar Parametros de la Aplicacion',
    titleDataTable: 'Lista de Parametros',
    view: 'index',
    urlPage:utilfull.returnUrl(req.originalUrl),
    nameTabla,
    dataSelect
  });
};

parameterCtrl.token = (req, res) => {
  userService.tokenUsuario()
}

parameterCtrl.renderIndex = async (req, res) => {
  req.app.locals.fieldAndTitle ={
    field:'Descripcion'
  }
  const { view } = req.params
  var title = 'Pagina no Encontrada'
  var rowData
  
  if (view == 'create') {
    title = 'Formulario para adicionar un parametro'
  } else {
    const { getById } = parameterCtrl;
    rowData = await getById(req, res)
    if (view == 'edit') {
      title = 'Formulario para modificar un parametro'
    }  
  }
  console.log(rowData)
  res.render('parameter/index', { 
    title, view, rowData ,
    urlPage:utilfull.returnUrl(req.originalUrl),
    nameTabla,idParameter:req.params.id});
};

parameterCtrl.getById = async (req, res) => {
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

parameterCtrl.getAll = async (req, res) => {
  const query = await generalCrud._getById(req.body.id)
  var data = []
  var item={}
  if (query.success) {
    let document = query.data.data();
    var array=document.value
    for (const key in array) {
      console.log(key,array[key])
      item['index']=key
      item['field']=array[key]
      data.push(item)
      item={}
    }
    res.send(data)
  } else {

  }
};

parameterCtrl.create = async (req, res) => {
  const {id,field}=req.body
  const query = await generalCrud._updateArray(id,field)
  if (query.success) {
    req.flash('success', 'Parametro creado satisfactoriamente')
    res.redirect('/parameter')
  } else {

  }
}

parameterCtrl.update = async (req, res) => {  
  const form = JSON.parse(JSON.stringify(req.body))
  console.log(form)
  const info = utilfull.dropUndefined(ParametersApp,form)
  console.log(info)
  const query = await generalCrud._updateById(req.body.id, info)
  if (query.success) {
    req.flash('success', 'Parametro actualizado satisfactoriamente')
    res.redirect('/parameter')
  } else {}
}

parameterCtrl.deleteItem = async (req, res) => {
  const query = await generalCrud._deleteById(req.body.idRow)
  if (query.success) {
    req.flash('success', 'Parametro Eliminado satisfactoriamente')
    res.redirect('/parameter')
  } else {

  }
}


module.exports = parameterCtrl;