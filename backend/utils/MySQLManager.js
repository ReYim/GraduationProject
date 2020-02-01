const baseAbsPath = __dirname + '/';
const Sequelize = require('sequelize');
const constants = require('../../common/constants');
const config = require('../configs/mysql.conf.json');

let MySQLManager = connectToMysql();

function connectToMysql() {
	let host = '182.92.157.186';
	let port = '3306';
	let dbname = 'mardan';
	let username = 'root';
	let password = '123456';

	try {
		let dbRef = new Sequelize(dbname, username, password, {
			host: host,
			port: port,
			dialect: 'mysql',
			// pool: {
			// 	max: 5,
			// 	min: 0,
			// 	idle: 10000
			// }
		});
		// console.log("connect mysql success");
		//初始化数据表
		dbRef.sync()
		return dbRef
	} catch(e) {
		console.log(e)
	}
}

module.exports = MySQLManager;
