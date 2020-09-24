var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const session = require('express-session');
var flash = require('connect-flash');
var multer = require('multer');
var path          = require('path');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');

var app = express();


// const db = require("./config/db");

// db.authenticate().then(() =>
//   console.log("Koneksi Berhasil")
// );


// import mongoose
// const mongoose = require('mongoose');
// mongoose.connect('mongodb+srv://codeathome:bwamern@cluster0-40j6e.mongodb.net/db_staycation?retryWrites=true&w=majority', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true,
//   useFindAndModify: false,
// });

var mysql = require('mysql');

// var con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "stay_cation_nodejs"
// });

// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
// });

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 600000 }
}));
app.use(flash());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/sb-admin-2', express.static(path.join(__dirname, 'node_modules/startbootstrap-sb-admin-2')));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRouter);


// app.use(bodyParser.urlencoded({extended : true}));
// app.use(bodyParser.json());


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
