const baseAbsPath = __dirname + '/';

const constants = require(baseAbsPath + '../common/constants');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const MySQLManager = require('./utils/MySQLManager');

const path = require('path');

app.use('/bin', express.static(baseAbsPath + '../frontend/bin'));

// Body parser middleware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());



app.use("*", (req, res, next) => {
	console.log(req.baseUrl);
	next()
})
/*------------------------*/

const User = require('./routers/user');

//---User router begins.---
// User non-page apis.
//TODO admin
app.use(constants.ROUTE_PATHS.API + constants.ROUTE_PATHS.USER + '/login',
	User.login);

app.use(constants.ROUTE_PATHS.API + constants.ROUTE_PATHS.USER,
	User.TokenAuth,
	User.AuthProtectRouter);

//TODO teache
//TODO student
//---User router ends.---

const port = 9099;
http.listen(port, function() {
	console.log("server start at" + port)
})

process.on('uncaughtException', (err) => {
  console.log(err.stack);
});
