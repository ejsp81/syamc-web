const itemPriceCtrl = {};
var moment = require('moment')
var ItemPrice = require('../models/itemPrice')
const GeneralCrud = require('../provider/general_crud');
var generalCrud = new GeneralCrud('itemPrice')
var utilfull = require('../helpers/utilfull');
const nameTabla=ItemPrice.prototype.name(true)

itemPriceCtrl.index = (req, res) => {  
  req.app.locals.fieldAndTitle = utilfull.fieldAndTitle({
     model: ItemPrice
 })
  res.render('item_price/index', {
    title: 'Administrar Productos',
    titleDataTable: 'Lista de Productos',
    view: 'index',
    urlPage:utilfull.returnUrl(req.originalUrl),
    nameTabla
  }); 
};


itemPriceCtrl.renderIndex = async (req, res) => {
  const { view } = req.params
  var title = 'Pagina no Encontrada'
  var rowData
  if (view == 'create') {
    title = 'Formulario para crear un nuevo producto'
  } else if (view == 'edit') {
    const { getById } = itemPriceCtrl;
    rowData = await getById(req, res)
    title = 'Formulario para modificar un producto'
  }
  res.render('item_price/index', { title, view, rowData,urlPage:utilfull.returnUrl(req.originalUrl),nameTabla });
};

itemPriceCtrl.getById = async (req, res) => {
  const query = await generalCrud._getById(req.params.id)
  if (query.success) {
    let document = query.data.data();
    document.lastUpdate = moment(document.lastUpdate.toDate()).format('DD/MM/YYYY')
    document.id = query.data.id
    return document
  } else {

  }
  /*  let itemPriceRef = db.collection('itemPrice').doc(req.params.id)
   let getDoc = itemPriceRef.get()
     .then(doc => {
       if (!doc.exists) {
         console.log('No such document!');
         return null
       } else {
         let document = doc.data();
         document.lastUpdate = moment(document.lastUpdate.toDate()).format('DD/MM/YYYY')
         document.id = doc.id
         return document
       }
     })
     .catch(err => {
       console.log('Error getting document', err);
     });
   return getDoc */
};

itemPriceCtrl.getAll = async (req, res) => {
  const query = await generalCrud._getRowsByParam('alliedEntity', req.app.locals.currentUser.idBD, '==')
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

itemPriceCtrl.create = async (req, res) => {
  const form = JSON.parse(JSON.stringify(req.body))  
  //user = (await userService.customClaim()).claims
  form.alliedEntity = req.app.locals.currentUser.idBD
  const info = ItemPrice.prototype.modelObject.bind(form)()
  const query = await generalCrud._create(info)
  if (query.success) {
    req.flash('success', 'Producto creado satisfactoriamente')
    res.redirect('/item_price')
  } else {

  }
}

itemPriceCtrl.update = async (req, res) => {
  /* let itemPriceRef = await db.collection('alliedEntity').doc('gSwR5FjzKr0wYLemqWB0').get()
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
  const info = ItemPrice.prototype.modelObject.bind(form)()
  const query = await generalCrud._updateById(req.body.id, info)
  if (query.success) {
    req.flash('success', 'Producto actualizado satisfactoriamente')
    res.redirect('/item_price')
  } else {

  }
}

itemPriceCtrl.deleteItem = async (req, res) => {
  const query = await generalCrud._deleteById(req.body.idRow)
  if (query.success) {
    req.flash('success', 'Producto Eliminado satisfactoriamente')
    res.redirect('/item_price')
  } else {

  }
}



module.exports = itemPriceCtrl;