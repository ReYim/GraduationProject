const Sequelize = require('sequelize');
const MySQLManager = require('../utils/MySQLManager');


/*
TODO:初始化数据库表，用户表以及数据表

const User = MySQLManager.define('user', {
	  username: Sequelize.STRING,
	  password: Sequelize.STRING,
	  weight: Sequelize.INTEGER,   //总管理员 0， 老师 1， 学生 3
});

const Information = MySQLManager.define('information',{
    username: Sequelize.STRING,
	sex:      Sequelize.INTEGER, //0 boy 1 girl
 	nation:   Sequelize.STRING,
	major:    Sequelize.STRING,
	id_card:  Sequelize.STRING,
	address:  Sequelize.STRING,
	is_army:  Sequelize.INTEGER, //是否参军0否|1是|2已报名
	origin:   Sequelize.STRING,
	type:     Sequelize.INTEGER,//0内高1预科
	phone:    Sequelize.INTEGER,
	house_address: Sequelize.STRING,
	permanent_address: Sequelize.STRING,
	drop_out_history: Sequelize.STRING,
	leave_history: Sequelize.STRING,
	szzlb: Sequelize.STRING,
	change_major: Sequelize.STRING,
	xycf: Sequelize.STRING,
	job: Sequelize.STRING,
	winning_record: Sequelize.STRING,
	scfjljdj: Sequelize.STRING,
	sfbjfchjyy: Sequelize.STRING,
	sfbxxlrzdgzdx: Sequelize.STRING,
	jtsfsa: Sequelize.STRING,
	sajsmqqk: Sequelize.STRING,
	jtszpcslxfs: Sequelize.STRING,
	jtszsqjlxfs: Sequelize.STRING,
	scycrjzjlb: Sequelize.STRING,
	crjzjsfsjxx: Sequelize.STRING,
	wsjyy: Sequelize.STRING,
	zxztbx: Sequelize.STRING,
	jydw: Sequelize.STRING,

});


const User = MySQLManager.define('user', {
	  username: Sequelize.STRING,
	  password: Sequelize.STRING,
	  weight: Sequelize.INTEGER,   //总管理员 0， 老师 1， 学生 3
});


//默认管理员密码
User.create({
	username:"admin",
	password:"123456",
	weight: 0,
})
	.then((admin, err) => {
		console.log("create super admin success")
	});


*/
const User = MySQLManager.define('test', {
	username: Sequelize.STRING,
	name: Sequelize.STRING,
	sex: Sequelize.INTEGER,   //0男 1女
});
module.exports = User;
//module.exports = Information;
