const Sequelize = require('sequelize');
const MySQLManager = require('../utils/MySQLManager');

const User = MySQLManager.define('user', {
	  username: Sequelize.STRING,
	  Password: Sequelize.STRING
});

module.exports = User
