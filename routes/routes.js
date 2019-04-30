const express = require('express');
const route = express.Router();

const control = require('../controller/control');

route.get('/login',control.getLogin);
route.post('/login', control.postLogin);
route.get('/berhasillogin', control.successLogin);
route.get('/gagallogin', control.failedLogin);

module.exports = route;