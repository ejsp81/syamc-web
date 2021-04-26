var moment = require("moment");
var utilfull = require("../helpers/utilfull");
const scheduleCtrl = {};
var Schedule = require("../models/schedule");
const GeneralCrud = require("../provider/general_crud");
var generalCrud = new GeneralCrud("schedule");
//const db = adminBD.firestore();

scheduleCtrl.getAppointment = (req, res) => {
  let scheduleRef = db.collection("schedule");
  var schedule = [];
  let query = scheduleRef
    .where("state", "==", false)
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        let document = doc.data();
        console.log(document);
        document.date = moment(document.date.toDate()).format(
          "DD/MM/YYYY, h:mm a"
        );
        schedule.push(document);
      });
      res.send(schedule);
    });
};

scheduleCtrl.renderAppointment = (req, res) => {
  req.app.locals.fieldAndTitle = {
    date: "Fecha",
    nameUser: "Usuario",
    licencePlate: "Placa",
    urlLicencePlate: "Tarjeta de Propiedad",
  };
  res.render("schedule/report/appointment", {
    title: "Citas CDA" ,
    nameTable: "Report",
    urlPage: utilfull.returnUrl(req.originalUrl)});
};

scheduleCtrl.renderProgramSchedule = (req, res) => {
  req.app.locals.fieldAndTitle = {
    date: "Fecha",
    field: "Citas",
    data: "Datos",
    assign: "Asignar",
  };
  res.render("schedule/program/body", {
    title: "Citas CDA",
    nameTable: "Schedule",
    urlPage: utilfull.returnUrl(req.originalUrl),
  });
};

scheduleCtrl.generateSchedule = async (req, res) => {
  var param = req.body
  var i = moment(param.firstDate + " " + '00:01', 'DD/MM/YYYY HH:mm')
  var f = moment(param.lastDate + " " + '23:59', 'DD/MM/YYYY HH:mm')
  var appointmentAvailable = {};
  generalCrud = new GeneralCrud("alliedEntity");
  console.log('...................................94797979')
  console.log(req.app.locals.currentUser)
  const query = await generalCrud._getById(req.app.locals.currentUser.idBD);
  var validateRange = moment(new Date(param.lastDate)).format('DD/MM/YYYY') == moment(new Date(param.firstDate)).format('DD/MM/YYYY')
  if (query.success) {
    var documentRef = query.data.ref;
    req.app.locals.documentRef = documentRef
    generalCrud = new GeneralCrud("schedule");

    const query2 = await generalCrud._findByThreeCondition({
      keyOne: "date",
      conditionOne: ">=",
      valueOne: i,
      keyTwo: "date",
      conditionTwo: "<=",
      valueTwo: f,
      keyThree: "alliedEntity",
      conditionThree: "==",
      valueThree: documentRef,
    });


    if (query2.success) {
      query2.data.forEach(function (doc) {        
        var data = doc.data();
        var date = moment(data.date.toDate()).format("DD/MM/YYYY");
        var hour = moment(data.date.toDate()).format("HH:mm");
        var appointment = `<button class="appointment btn btn-danger" disabled>${hour}</button> `;
        if (appointmentAvailable[date] == undefined) {
          appointmentAvailable[date] = appointment;
        } else {
          appointmentAvailable[date] = appointmentAvailable[date] + appointment;
        }
      });
    } else {
      console.log('Noooooooooooooo Encontrado............')
    }
    var response = [];

    var array = JSON.parse(param.data);
    array.forEach(function (elemento) {
      var date=moment(elemento.date,'DD/MM/YYYY').locale("es").format('dddd, DD MMM')
      if (appointmentAvailable[elemento.date] == undefined) {
        response.push({
          date: date,
          field: elemento.dailyAppointmentsButton,
          data: {
            date:elemento.date,
            data: elemento.dailyAppointmentsArray
          },
          assign: true,
        });
      } else {
        response.push({
          date: date,
          field: appointmentAvailable[elemento.date],
          data: {
            date:elemento.date,
            data: elemento.dailyAppointmentsArray
          },
          assign: false,
        });
      }
    });
    res.send(response);
  } else {

  }
};

scheduleCtrl.saveSchedule = async (req, res) => {
  console.log(req.body);
  var name = Schedule.prototype.name();
  generalCrud = new GeneralCrud('schedule');

  req.body.data.forEach(function (elemento) {
    var hours = elemento.data.data;
    var date=elemento.data.date
    for (const key in hours) {  
      if (hours[key]!=null) {
        var objec = new Schedule({
          date: moment(date + " " + hours[key], 'DD/MM/YYYY HH:mm'),
          time: 45,
          state: true,
          inProgress: false,
          alliedEntity: req.app.locals.documentRef,
          typeOfVehicle: "",
          inProgress: false,
          idUserProgress: '',
          obervation: '',
          infoSchedule: {},
        })        
      }  
      generalCrud._createBatch(objec.toJSON());
      object=null
    }
  });
  var resp = await generalCrud._commitBatch()
  if (resp.success) {
    res.send(resp)
  } else {

  }
};

scheduleCtrl.appointmentReport=async (req, res) => { 
  var schedule = []
  const query = await generalCrud._getRowsByParam('state',false,'==')
  if (query.success) {
    query.data.forEach(doc => {
      let document = doc.data()
      let docum={}
      docum.date= moment(document.date.toDate()).format('DD/MM/YYYY, h:mm a');
      docum.nameUser=document.infoSchedule.nameUser
      docum.licencePlate=document.infoSchedule.licencePlate
      //docum.urlLicencePlate='url'
      docum.urlLicencePlate=document.infoSchedule.urlLicencePlate
      schedule.push(docum)
    });  
    res.send(schedule)  
  }  
};

module.exports = scheduleCtrl;
