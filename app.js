var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var models = require('./models/models')

//meine
var authorization = require('./helpers/authorization');
var db = require('./helpers/baza');


models.createTables();

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
var todoRouter =require('./routes/todo');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');
var pocetniRouter = require('./routes/pocetna');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(session(
    {
        secret: "tajna bre",
        resave: true,
        saveUninitialized: true,
    }
));

app.use(authorization);
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', pocetniRouter);
app.use('/todo', todoRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);

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

app.listen(8080, function (err) {
  if (err) { 
     console.log(err);
  } else {
     console.log("App started at port 8080");
  }    
});


module.exports = app;
