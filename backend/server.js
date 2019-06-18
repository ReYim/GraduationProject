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

// Pug template. Reference http://expressjs.com/en/guide/using-template-engines.html
app.set('view engine', 'pug');
app.set('views', baseAbsPath + './pugs');

/*------------------------*/

const User = require('./routers/user');

//---User router begins.---

// User pages.
app.use(constants.ROUTE_PATHS.PLAYER + constants.ROUTE_PATHS.PAGE,
	User.PageRouter);

// User non-page apis.
app.use(constants.ROUTE_PATHS.PLAYER + constants.ROUTE_PATHS.API,
	//TODO 验证用户身份的 User.TokenAuth,
	User.AuthProtectRouter);

//---User router ends.---

const port = 9099;
http.listen(port, function() {
	console.log("server start at" + port)
})

/*process.on('uncaughtException', (err) => {
  logger.error(err.stack);
});
*/