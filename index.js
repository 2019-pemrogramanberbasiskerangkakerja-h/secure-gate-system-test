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

const pool = mariadb.createPool({
	host: '127.0.0.1',
	user: 'root',
	database: 'pbkkh_securegate',
	port: 3306
})

app.use(cookieParser());
app.use(session({
	secret: 'hehe',
	saveUninitialized: true,
	resave: true
}));
app.use(flash());
app.use('/', router);
var sess;

router.get('/login', function(req, res) {
	res.sendFile(path.join(__dirname+'/login.html'));
})

router.post('/login', function(req, res) {
	sess = req.session;
	var mkmk, usergate = [], flag = 0;
	var uname = req.body.username;
	var pass = req.body.password;
	var gate = req.body.gate;
	console.log("Mencoba login dengan nama pengguna", uname, "dengan password", pass);
	query = 'select user_password from users where user_nrp=' + "'" + uname + "'";
	console.log(query);
	pool.query(query).then(results => {
		mkmk = results[0].user_password;
		console.log(mkmk);
		var querylogin = 'insert into log values(' + "'" + uname + "'" + ",now()," + "'mencoba login di gate " + gate + "')" ;
		console.log(querylogin);
		pool.query(querylogin);
		if (md5(pass) == mkmk) {
			if (uname == 'admin') {
				console.log('password benar');
				sess.username=uname;
				res.cookie('NRP_SESSION',uname, { maxAge: 900000, httpOnly: true });
				res.redirect('/berhasillogin');
			}
			else {
				console.log('password benar');
				query = 'select gate_id from usergate where user_nrp =' + "'" + uname + "'";
				console.log(query);
				pool.query(query).then(results => {
					for (var i=0;i<results.length;i++) {
						usergate.push(results[i].gate_id);
					}
					for (var i=0;i<results.length;i++) {
						if (gate == usergate[i]) {
							flag = 1;
						}
					}
					if (flag == 1) {
						var starttime, endtime, querystart, queryend;
						querystart = 'select gate_start from gate where gate_id =' + "'" + gate + "'";
						pool.query(querystart).then(results => {
							starttime = results[0].gate_start;
							queryend = 'select gate_end from gate where gate_id =' + "'" + gate + "'";
							pool.query(queryend).then(results => {
								endtime = results[0].gate_end;
								/*console.log(Date.parse(starttime));
								console.log(Date.parse(endtime));
								console.log(Date.now());*/
								if (Date.parse(starttime) <= Date.now() && Date.now() <= Date.parse(endtime)) {
									console.log('boleh ngakses');
									console.log(uname, 'berhasil login');
									sess.username=uname;
									res.cookie('NRP_SESSION',uname, { maxAge: 900000, httpOnly: true });
									res.redirect('/berhasillogin');
								}
								else {
									console.log('maaf, gak boleh ngakses karena bukan pada waktunya');
									res.redirect('/gagallogin');
								}
							})
						})
					}
					else {
						console.log(gate, 'bukan gate yang diperbolehkan untuk user', uname);
						res.redirect('/gagallogin');
					}
				})
			}
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
	sess = req.session;
	var uname = req.body.username;
	var pass = req.body.password;
	var confirm = req.body.password_confirm;
	console.log("Mencoba buat akun baru dengan nama pengguna", uname, "dengan password", pass);
	query = 'insert into users values (' + "'" + uname + "'" + ',' + 'md5(' + "'" + pass + "'" + '),' + "'user')";
	if (pass != confirm) {
		
	}
	else {
		pool.query(query).then(results=> {
			sess.username = uname;
			res.cookie('NRP_SESSION',uname, { maxAge: 900000, httpOnly: true });
			res.redirect('/berhasilbuatakun');
		}).catch(err => {
			res.redirect('/gagalbuatakun');
		})
	} 
})

router.get('/gate', function(req, res) {
	sess = req.session;
	if (sess.username != 'admin') {
		console.log('Kesalahan hak akses: Hanya untuk admin!');
		res.sendFile(path.join(__dirname+'/login.html'));
	}
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

router.get('/usergate', function(req, res) {
	sess = req.session;
	if (sess.username != 'admin') {
		console.log('Kesalahan hak akses: Hanya untuk admin!');
		res.sendFile(path.join(__dirname+'/login.html'));
	}
	res.sendFile(path.join(__dirname+'/usergate.html'));
})

router.post('/usergate', function(req, res) {
	var user = req.body.user;
	var gate = req.body.gate;
	query = 'insert into usergate values(' + "'" + user + "'," + "'" + gate + "')"
	console.log(query)
	pool.query(query).then(results => {
		res.redirect('/berhasilusergate');
	})
});

router.get('/logout', function(req, res) {
	console.log(sess.username, 'logout...');
	sess = req.session;
	res.clearCookie('NRP_SESSION');
	req.session.destroy((err) => {
		if (err) {
			return console.log(err);
		}
		res.redirect('/login')
	})
})

router.get('/berhasilusergate',  function(req, res) {
	res.sendFile(path.join(__dirname+'/berhasilusergate.html'));
});

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