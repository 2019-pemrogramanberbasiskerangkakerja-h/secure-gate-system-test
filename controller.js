'use strict';

var md5 = require('md5');

var response = require('./res');
var connection = require('./conn');

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

exports.index = function(req, res) {
    response.ok("Hello from the Node JS RESTful side!", res)
};