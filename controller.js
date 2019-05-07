'use strict';

var md5 = require('md5');
const path = require('path');
var response = require('./res');
var connection = require('./conn');
var session = require('express-session');
var sess;

exports.register = function(req, res) {
	res.sendFile(path.join(__dirname+'/register.html'));
}
exports.users = function(req, res) {
    connection.query('SELECT * FROM users', function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res);
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
			res.sendFile(path.join(__dirname+'/berhasilhapusakun.html'));
		}
	})
}

exports.login = function(req, res) {
	res.sendFile(path.join(__dirname+'/login.html'));
}

exports.dologin = function(req, res) {
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
			if (username == 'admin') {
				if (system_password	== md5(password)) {
					sess.username = username;
					response.ok("Login berhasil!", res);
				}
				else {
					response.ok("Login gagal, username atau password salah!", res);
				}
			}
			else {
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
		}
	})
}

exports.formGate = function(req, res) {
	sess=req.session;
	if (sess.username != 'admin') {
		response.ok("Maaf, fungsi ini hanya untuk admin!", res);
	}
	else {
		res.sendFile(path.join(__dirname+'/gate.html'));
	}
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

exports.deleteGate = function(req, res) {
    var id = req.params.gateid;
    connection.query('delete from gate where gate_id = ?', [id], function (error, rows, fields) {
        if (error) {
            console.log(error);
        }
        else {
            response.ok(rows, res);
        }
    })
}

exports.allGate = function(req, res) {
    connection.query('SELECT * FROM gate', function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
        }
    });
};

exports.infoGate = function(req, res) {
    var gateid = req.params.gateid;
    connection.query('select gate_start, gate_end, user_nrp from gate, usergate where usergate.gate_id = gate.gate_id and gate.gate_id = ?', [gateid], function(error, rows, fields) {
        if(error) {
            console.log(error);
        }
        else {
            response.ok(rows, res);
        }
    })
}

exports.showUserGateAddForm = function(req, res) {
	sess = req.session;
	if (sess.username != 'admin') {
		response.ok("Maaf, fungsi ini hanya untuk admin!", res);
	}
	res.sendFile(path.join(__dirname+'/usergate.html'));
}

exports.usergateAdd = function(req, res) {
	var name = req.body.user;
	var gate = req.body.gate;
	connection.query('insert into usergate (user_nrp,gate_id) values (?,?)', [name, gate], function(error, rows, fields) {
		if(error) {
			console.log(error);
		}
		else {
			var resp = "Berhasil menambahkan user " + name + " ke gate " + gate
			console.log(resp)
			response.ok(resp, res);
		}
	})
}

exports.showUserGateDelForm = function(req, res) {
	sess = req.session;
	if (sess.username != 'admin') {
		response.ok("Maaf, fungsi ini hanya untuk admin!", res);
	}
	res.sendFile(path.join(__dirname+'/usergatedel.html'));
}

exports.usergateDel = function(req, res) {
	var name = req.body.user;
	var gate = req.body.gate;
	connection.query('delete from usergate where user_nrp = ? and gate_id = ?', [name, gate], function(error, rows, fields) {
		if(error) {
			console.log(error);
		}
		else {
			var resp = "Berhasil menghapus user " + name + " dari gate " + gate
			console.log(resp)
			response.ok(resp, res);
		}
	})
}

exports.logout = function(req, res) {
	sess = req.session;
	req.session.destroy((err) => {
		if (err) {
			return console.log(err);
		}
		res.redirect('/')
	})
}

exports.index = function(req, res) {
    res.sendFile(path.join(__dirname+'/index.html'));
};

