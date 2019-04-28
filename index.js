var express = require('express');
var app = express();
const path = require('path');
const router = express.Router();
var bodyParser = require('body-parser');
var mariadb = require('mariadb');
var md5 = require('md5');

const pool = mariadb.createPool({
	host: '127.0.0.1',
	user: 'root',
	database: 'pbkkh_securegate',
	port: 3306
})

app.use(bodyParser.urlencoded({extended : true}));

app.use('/', router);

router.get('/login', function(req, res) {
	res.sendFile(path.join(__dirname+'/index.html'));
})

router.post('/login', function(req, res) {
	var mkmk;
	var uname = req.body.username;
	var pass = req.body.password;
	console.log("Mencoba login dengan nama pengguna", uname, "dengan password", pass);
	query = 'select user_password from users where user_nrp=' + "'" + uname + "'";
	console.log(query);
	pool.query(query).then(results => {
		mkmk = results[0].user_password;
		console.log(mkmk);
		res.redirect('/berhasillogin');
	}).catch(err => {
		console.log(err);
		res.redirect('/gagallogin')
	})
})

router.get('/gagallogin',  function(req, res) {
	res.sendFile(path.join(__dirname+'/gagallogin.html'));
});

router.get('/berhasillogin',  function(req, res) {
	res.sendFile(path.join(__dirname+'/berhasillogin.html'));
});


app.listen(process.env.port || 3000);

console.log('Running at Port 3000');