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
app.use(flash());
app.use('/', router);
var sess;

exports.getLogin = function(req, res) {
	let reqPath = path.join(__dirname, '../');
	console.log(reqPath);
	res.sendFile(path.join(reqPath+'/login.html'));
}

exports.postLogin = function(req, res) {
	let reqPath = path.join(__dirname, '../');
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
		var querylogin = 'insert into log values(' + "'" + uname + "'" + ",now()," + "'mencoba login')";
		console.log(querylogin);
		pool.query(querylogin);
		if (md5(pass) == mkmk) {
			if (uname == 'admin') {
				console.log('password benar');
				//console.log(sess.username);
				sess.username=uname;
				res.cookie('NRP_SESSION',uname, { maxAge: 900000, httpOnly: true });
				res.sendFile(path.join(reqPath+'/berhasillogin.html'));
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
}

exports.successLogin = function(req, res) {
	let reqPath = path.join(__dirname, '../');
	res.sendFile(path.join(reqPath+'/berhasillogin.html'));
}

exports.failedLogin = function(req, res) {
	let reqPath = path.join(__dirname, '../');
	res.sendFile(path.join(reqPath+'/gagallogin.html'));
};