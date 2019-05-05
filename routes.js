'use strict';

module.exports = function(app) {
    var todoList = require('./controller');

    app.route('/')
        .get(todoList.index);

    app.route('/users')
        .get(todoList.users);

    app.route('/users')
    	.post(todoList.createUsers);

    app.route('/users/:nrp')
    	.get(todoList.getUserById);

    app.route('/users/:nrp')
    	.delete(todoList.deleteUser);
};