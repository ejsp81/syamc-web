/* var express = require('express');
var moment =require('moment')
var router = express.Router();
const adminBD = require('../config/firebase');
const { firestore } = require('../config/firebase');
//var login = require('../controllers/authenticate/login');
//const userService = require("../config/user_service");
var GeneralInformation = require('../models/general_information')

// Modules
const passport = require("passport");

// Controllers
const { renderIndex } = require("../controllers/index.controller");

// Helpers
const { isAuthenticated } = require("../helpers/auth");


router.get("/",isAuthenticated, renderIndex);

const db = adminBD.firestore();
 
router.get('/prueba', (req, res) => {
  console.log('-------0.0')
  let scheduleRef = db.collection('Devschedule');
  var schedule = []
  console.log('-------0')
  let query = scheduleRef.where('state', '==', false).get().then(snapshot => {
    snapshot.forEach(doc => {
      console.log('-------1')
      let document = doc.data()
      console.log(document)
      document.date= moment(document.date.toDate()).format('DD/MM/YYYY, h:mm a');
      schedule.push(document)
    });
    res.send(schedule)
  });  

  db.collection('users').get()
    .then((snapshot) => {
      res.send( snapshot.docs);
    })
    .catch((err) => {
      res.send('Error getting documents');
    });  

});

router.post("/", async (req, res) => {
  console.log('holaaaaaaaaaaaaaaaaaaaaaa')
  const { email, password } = req.body;
  console.log(email)
  console.log(password)
  const form = JSON.parse(JSON.stringify(req.body))
  var someone = new GeneralInformation("Corriente", 5000);
 console.log(GeneralInformation.prototype.modelGeneralInformation.bind(form)())
  try {
    const user = await userService.authenticate(email, password);
    res.json(user);
    //res.render('index', {error: false});
  } catch (err) {
    //res.render('index', {error: true});
    res.status(401).json({ errorES: err.message });
  }
});

router.get('/citas',isAuthenticated, function (req, res, next) {
  res.render('citas',{title:'Citas CDA'});
});

 router.get('/',function(req,res){
  console.log('jsdlfjsdlfjsdlfjsdfljdsfldsjflsdjflas')
  console.log('----------------------------------------------------')
  console.log(req.isAuthenticated())
  console.log('holano')
  console.log('----------------------------------------------------')
 
  console.log(res.locals.errorLog)
  res.render('login')
}) 

router.get('/holasi', function (req, res) { 
  
  //console.log(res.locals.currentUser)
  const user=req.flash('user');
  res.locals.currentUser=user[0]
 //console.log(user[0])
  console.log('----------------------------------------------------')
  console.log(req.isAuthenticated())
  console.log('holasi')
  console.log('----------------------------------------------------')
 res.send("Estoy feliz se ha logueado")
});


router.get('/holano', function (req, res) {  
 console.log(req.flash())
 
 res.render('login');
  //res.send("Estoy triste no se ha logueado")
 });
 

router.post('/loginpo', passport.authenticate("local", {
  successRedirect: "/holasi",
  failureRedirect: "/holano",
  failureFlash: true,
  successFlash:true,
}))


router.post('/',async function (req, res, next) {
  
  const { email, password } = req.body;
  try {
    const user = await userService.authenticate(email, password);
    res.render('index', {error: false,user:user.user.displayName});
  } catch (err) {
    //res.render('index', {error: true});
    res.status(401).json({ errorES: err.message });
  } 
 const { email, password } = req.body;
  let loginResult = login(email, password);

  if (loginResult) {
    res.render('index', { title: email });
  }
  else {
    res.render('login', { error: true });
  } 
});*/
