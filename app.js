var express = require('express');
var app = express();
const path = require('path');
const router = express.Router();
var bodyParser = require('body-parser');
var mariadb = require('mariadb');
var md5 = require('md5');
var session = require('express-session');
app.use(bodyParser.urlencoded({extended : true}));
var cookieParser = require('cookie-parser');
var flash = require('connect-flash');
const { check } = require('express-validator/check');
const route = require('./routes/routes');

app.use('/', route);
app.use(session({
	secret: 'hehe',
	saveUninitialized: true,
	resave: true
}));

app.listen(process.env.port || 3000);

console.log('Running at Port 3000');