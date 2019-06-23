const Sequelize = require('sequelize');
const MySQLManager = require('../../utils/MySQLManager');

const Test = MySQLManager.define('test', {
    username: Sequelize.STRING,
    name: Sequelize.STRING,
    sex: Sequelize.INTEGER,   //0男 1女
    userId: Sequelize.INTEGER,
});


module.exports = Test;