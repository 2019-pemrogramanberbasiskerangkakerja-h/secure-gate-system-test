session = require('express-session');
var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    bodyParser = require('body-parser'),
    controller = require('./controller');
    md5 = require('md5');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
	secret: 'hehe',
	saveUninitialized: true,
	resave: true
}));

var routes = require('./routes');
routes(app);

app.listen(port, "192.168.1.106");
console.log('Berjalan pada port: ' + port);