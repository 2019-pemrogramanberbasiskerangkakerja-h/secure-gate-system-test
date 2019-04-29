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
	res.sendFile(path.join(__dirname+'/login.html'));
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
		var querylogin = 'insert into log values(' + "'" + uname + "'" + ",now()," + "'mencoba login')";
		console.log(querylogin);
		pool.query(querylogin);
		if (md5(pass) == mkmk) {
			console.log('password benar');
			res.redirect('/berhasillogin');
		}
		else {
			console.log('username/password salah');
			res.redirect('/gagallogin');
		}
	}).catch(err => {
		console.log(err);
		res.redirect('/gagallogin')
	})
})

router.get('/register', function(req, res) {
	res.sendFile(path.join(__dirname+'/register.html'));
})

router.post('/register', function(req, res) {
	var uname = req.body.username;
	var pass = req.body.password;
	var confirm = req.body.password_confirm;
	console.log("Mencoba buat akun baru dengan nama pengguna", uname, "dengan password", pass);
	query = 'insert into users values (' + "'" + uname + "'" + ',' + 'md5(' + "'" + pass + "'" + '),' + "'user')";
	if (pass != confirm) {
		res.redirect('/gagalbuatakun');
	}
	else {
		pool.query(query).then(results=> {
			res.redirect('/berhasilbuatakun');
		}).catch(err => {
			res.redirect('/gagalbuatakun');
		})
	} 
})

router.get('/gate', function(req, res) {
	res.sendFile(path.join(__dirname+'/gate.html'));
})

router.post('/gate', function(req, res) {
	var gateid = req.body.id;
	var start = req.body.start;
	var end = req.body.end;
	query = 'insert into gate values(' + "'" + gateid + "'" + ',' + "'" + start + "'" + ',' + "'" + end + "'" +')';
	console.log(query);
	pool.query(query).then(results => {
		res.redirect('/berhasilbuatgate');
	}).catch(err => {
		res.redirect('/gagalbuatgate');
	})
})

router.get('/gagallogin',  function(req, res) {
	res.sendFile(path.join(__dirname+'/gagallogin.html'));
});

router.get('/gagalbuatakun',  function(req, res) {
	res.sendFile(path.join(__dirname+'/gagalbuatakun.html'));
});

router.get('/berhasillogin',  function(req, res) {
	res.sendFile(path.join(__dirname+'/berhasillogin.html'));
});

router.get('/berhasilbuatakun',  function(req, res) {
	res.sendFile(path.join(__dirname+'/berhasilbuatakun.html'));
});

router.get('/berhasilbuatgate',  function(req, res) {
	res.sendFile(path.join(__dirname+'/berhasilbuatgate.html'));
});

router.get('/gagalbuatgate',  function(req, res) {
	res.sendFile(path.join(__dirname+'/gagalbuatgate.html'));
});

app.listen(process.env.port || 3000);

console.log('Running at Port 3000');