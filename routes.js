'use strict';

module.exports = function(app) {
    var todoList = require('./controller');

    app.route('/')
        .get(todoList.index);

    app.route('/register')
        .get(todoList.register);

    app.route('/users')
        .get(todoList.users);

    app.route('/users')
    	.post(todoList.createUsers);

    app.route('/users/:nrp')
    	.get(todoList.getUserById);

    app.route('/users/:nrp')
    	.delete(todoList.deleteUser);

    app.route('/login')
        .post(todoList.dologin);

    app.route('/login')
        .get(todoList.login);

    app.route('/gate')
        .post(todoList.createGates);

    app.route('/gate/:gateid')
        .delete(todoList.deleteGate);

   app.route('/gate')
        .get(todoList.allGate);

    app.route('/gate/:gateid')
        .get(todoList.infoGate);

    app.route('/buatgate')
        .get(todoList.formGate)

    app.route('/usergate')
        .get(todoList.showUserGateAddForm)

    app.route('/usergate')
        .post(todoList.usergateAdd)

    app.route('/usergatedel')
        .get(todoList.showUserGateDelForm)

    app.route('/usergatedel')
        .post(todoList.usergateDel)

    app.route('/logout')
        .get(todoList.logout)
};