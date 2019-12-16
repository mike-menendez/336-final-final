var express = require('express');
var path = require('path');
var logger = require('morgan');
var session = require('express-session');
var cookieParser = require('cookie-parser');


var indexRouter = require('./routes/index');
var authRouter = require('./routes/signin');
// var adminRouter = require('./routes/admin');
var userRouter = require('./routes/user');
var app = express();

app.engine('html', require('ejs').renderFile);

app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));

// app.use(cookieParser);
// app.use(session({ secret: "Bigus Secretus" }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/user', userRouter);
// app.use('/admin', adminRouter);
app.use('/auth', authRouter);

module.exports = app;