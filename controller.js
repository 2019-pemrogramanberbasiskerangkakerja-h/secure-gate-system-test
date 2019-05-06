'use strict';

var md5 = require('md5');

var response = require('./res');
var connection = require('./conn');
var session = require('express-session');
var sess;

exports.users = function(req, res) {
    connection.query('SELECT * FROM users', function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
        }
    });
};

exports.createUsers = function(req, res) {
	var nrp = req.body.username;
	var password = md5(req.body.password);
	var role = 'user';
	connection.query('insert into users (user_nrp, user_password, user_role) values (?,?,?)', [nrp, password, role], function(error, row, fields) {
		if(error) {
			console.log(error);
		}
		else {
			response.ok("Berhasil menambahkan user!", res);
		}
	});
};

exports.getUserById = function(req, res) {
	var nrp = req.params.nrp;
	connection.query('select * from users where user_nrp = ?', [nrp], function(error, rows, fields) {
		if(error) {
			console.log(error);
		}
		else {
			response.ok(rows, res);
		}
	})
}

exports.deleteUser = function(req, res) {
	var nrp = req.params.nrp;
	connection.query('delete from users where user_nrp = ?', [nrp], function (error, rows, fields) {
		if (error) {
			console.log(error);
		}
		else {
			response.ok(rows, res);
		}
	})
}

exports.login = function(req, res) {
	sess = req.session;
	sess.username = 0;
	var flag = 0;
	var permitted_gates = [];
	var username = req.body.username;
	var password = req.body.password;
	var gate = req.body.gate;
	var starttime, endtime;
	connection.query('select user_password from users where user_nrp = ?', [username], function (error, rows, fields) {
		if(error) {
			console.log(error);
		}
		else {
			//store the password
			var system_password = rows[0].user_password;
			//console.log(md5(password));
			//console.log(system_password);
			if (md5(password) == system_password) {
				connection.query('select gate_id from usergate where user_nrp = ?', [username], function (error, rows, fields) {
					//console.log(rows[1].gate_id);
					for (var i=0;i<rows.length;i++) {
						//console.log(rows[i].gate_id);
						permitted_gates.push(rows[i].gate_id);
					}
					for (var i=0;i<permitted_gates.length;i++) {
						if (gate == permitted_gates[i]) {
							flag = 1;
						}
					}
					if (flag == 1) {
						var today = new Date();
						var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
						connection.query('select gate_start from gate where gate_id = ?', [gate], function (error, rows, fields) {
							starttime = rows[0].gate_start;
							connection.query('select gate_end from gate where gate_id = ?', [gate], function (error, rows, fields) {
								endtime = rows[0].gate_end;
								console.log(time, starttime, endtime);
								//console.log(Date.parse(time), Date.parse(starttime), Date.parse(endtime));
								if (starttime <= time && time <= endtime) {
									sess.username = username;
									console.log(sess.username);
									res.cookie('NRP_SESSION',username, { maxAge: 900000, httpOnly: true });
									response.ok("Login berhasil!", res);
								}
								else {
									response.ok("Login gagal, belum waktunya!", res);
								}
							});
						});
					}
					else {
						response.ok("Login gagal, bukan gate yang dibolehkan untuk user!", res);
					}
				});
				/*sess.username = username;
				res.cookie('NRP_SESSION',username, { maxAge: 900000, httpOnly: true });*/
			}
			else {
				response.ok("Login gagal, username atau password salah!", res);
			}
			//response.ok(rows, res);
		}
	})
}

exports.createGates = function(req, res) {
    var id = req.body.idgate;
    var start = req.body.start;
    var end = req.body.end;
    connection.query('insert into gate (gate_id, gate_start, gate_end) values (?,?,?)', [id, start, end], function(error, row, fields) {
        if(error) {
            console.log(error);
        }
        else {
            response.ok("Berhasil menambahkan gate!", res);
        }
    });
};

exports.index = function(req, res) {
    response.ok("Hello from the Node JS RESTful side!", res)
};

