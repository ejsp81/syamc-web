var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var bodyParser = require('body-parser');
const methodOverride = require('method-override');
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
//const flash = require('connect-flash');
var flash = require('express-flash');
const passport = require('passport');
const session = require('express-session');
const userService = require('./config/user_service');
const swaggerUi = require('swagger-ui-express');
// Initializations
var app = express();
require('./config/passport');

// settings
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


// middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.use(methodOverride('_method'));
app.use(cookieParser('keyboard cat'));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 300000 }
}));


app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


// Global Variables


 
/* app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
 */


// Bootstrap 4 y librerías necesarias
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/js', express.static(__dirname + '/node_modules/popper.js/dist'));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/js', express.static(__dirname + '/node_modules/angular/'));
//datatable
app.use('/css', express.static(__dirname + '/node_modules/datatables.net-bs4/css'));
app.use('/css', express.static(__dirname + '/node_modules/datatables.net-responsive-bs4/css'));
app.use('/js', express.static(__dirname + '/node_modules/datatables.net/js'));
app.use('/js', express.static(__dirname + '/node_modules/datatables.net-bs4/js'));
app.use('/js', express.static(__dirname + '/node_modules/datatables.net-responsive/js'));
app.use('/js', express.static(__dirname + '/node_modules/datatables.net-responsive-bs4/js'));
//select
app.use('/css', express.static(__dirname + '/node_modules/select2-bootstrap-theme/dist'));
app.use('/css', express.static(__dirname + '/node_modules/select2/dist/css'));
app.use('/js', express.static(__dirname + '/node_modules/select2/dist/js'));
//toast
app.use('/css', express.static(__dirname + '/node_modules/toastr/build'));
app.use('/js', express.static(__dirname + '/node_modules/toastr/build'));

app.use('/fontawesome', express.static(__dirname + '/node_modules/@fortawesome/fontawesome-free'));
app.use('/datetimepicker', express.static(__dirname + '/node_modules/pc-bootstrap4-datetimepicker/build'));
app.use('/moment', express.static(__dirname + '/node_modules/moment/dist'));

//Configuracion rutas
// swagger definition
var swaggerJSDoc = require('swagger-jsdoc');
// swagger definition
var swaggerDefinition = {
  info: {
    title: 'Node Swagger API',
    version: '1.0.0',
    description: 'Demonstrating how to describe a RESTful API with Swagger',
  },
  host: '',
  basePath: '/',
};

// options for the swagger docs
var options = {
  // import swaggerDefinitions
  swaggerDefinition: swaggerDefinition,
  // path to the API docs
  apis: ['./routes/*.routes.js'],
};
// initialize swagger-jsdoc
var swaggerSpec = swaggerJSDoc(options);

// serve swagger
app.get('/swagger.json', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

var indexRoute = require('./routes/index.routes');
var usersRoute = require('./routes/users.routes');
var scheduleRoute = require('./routes/schedule.routes');
var itemPriceRoute = require('./routes/item_price.routes');
var alliedEntityRoute = require('./routes/allied_entity.routes');
var generalInformation = require('./routes/general_information.routes');
var parameter = require('./routes/parameter.routes');
app.use('/', indexRoute);
app.use('/users', usersRoute);
app.use('/schedule', scheduleRoute);
app.use('/item_price', itemPriceRoute);
app.use('/allied_entity', alliedEntityRoute);
app.use('/general_information', generalInformation);
app.use('/parameter', parameter);
if (process.env.NODE_ENV !='devolopment') {
  var seedRoute = require('./routes/seed.routes');
  app.use('/seeds', seedRoute);  
}


//app.locals.currentUser = 42;
app.use((req, res, next) => { 
   /*res.locals.dev =true;
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.errorLog =false;
  res.locals.currentUser = req.user;
  res.locals.user = req.user || null; */
  /* console.log('ññññññññññññññññññññññññññññññññññññññññññññññññññññññññññññññññññññññññññññññ')
  console.log(userService.usuarioActual)
  res.locals.currentUser=userService.usuarioActual */
  next();
});

// catch 404 and forward to error handler
/* app.use(function(req, res, next) {
  next(createError(404));
});
 */
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


// static files
app.use(express.static(path.join(__dirname, 'public')));
module.exports = app;
