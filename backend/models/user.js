const Sequelize = require('sequelize');
const MySQLManager = require('../utils/MySQLManager');

const User = MySQLManager.define('user', {
	  username: Sequelize.STRING,
	  password: Sequelize.STRING,
	  weight: Sequelize.INTEGER,   //总管理员 0， 老师 1， 学生 3
});

//默认管理员密码
/*User.create({
	username:"admin",
	password:"123456",
	weight: 0,
})
	.then((admin, err) => {
		console.log("create super admin success")
	});
*/



module.exports = User;
