
const express = require('express');
const constants = require('../../common/constants');
const KEY = require('../utils/common')
const redis = require('redis')
const jsonwebtoken = require('jsonwebtoken');
const LOGIN =require('./login_logout/login')
const LOGOUT =require('./login_logout/logout')
const Add_Student = require('./add_del_student/add_student')
const Update = require('./add_del_student/update')

//todo start redis client
client=redis.createClient();
client.on('ready',(err)=>{
	console.log('redis is ready!')
})

/*const NotProtectRouter = express.Router({
	mergeParams: true
});

PageRouter.get("/login", login);*/

const AuthProtectRouter = express.Router({
	mergeParams: true
});
AuthProtectRouter.post("/add-student", add_student);  //handle login request
AuthProtectRouter.post("/logout", logout);  //handle login request
AuthProtectRouter.get("/info", getInfo);
AuthProtectRouter.post("/update",update)


function getInfo(req, res) {
	res.json({
		name: "admin",
		avatar: "a",
		code: constants.RetCode.SUCCESS
	})
}



function update(req,res) {	Update.update(req,res)	}    //正式编辑数据

function add_student(req,res){	Add_Student.add_student(req,res);	}    //正式添加学生

function login(req, res){	LOGIN.login(req,res);	}

function logout(req,res) {	LOGOUT.logout(req,res);	}

function spaRender(req, res) {
	const xBundleUri = '/bin/player.zh_ch.bundle.js';
	const paramDict = {
		xBundleUri: constants.ROUTE_PATHS.BASE + xBundleUri,
	};
	res.render('index', paramDict);
}

function TokenAuth(req, res, next) {
	if(req.body.token===undefined){
		res.json({
			code: constants.RetCode.NULL_INFO_ERROR,
		})
	}else{
		let token = req.body.token || req.query.token;
		console.log("token=" + token);
		jsonwebtoken.verify(token, KEY, (err, decodedInfo) => {
			if(err == null) {
				const username = decodedInfo.data.username;
				client.get(username,(err, reply) => {  // 这是根据解析TOKEN获取的USERNAME获取的TOKEN
					if (err){
						console.log("logout faild!", err)
						res.json({
							code:constants.RetCode.REDIS_ERROR,
						})
					} else {
						if(token === reply){
							req.body.username = username;
							next()
						} else {
							res.json({
								code: constants.RetCode.NOT_FOUND_TOKEN,   //第二次注销失败
							})
						}
					}
				});
			} else {
				res.json({
					code: constants.RetCode.UNKNOWN_ERROR,
				})
			}
		});
	}
}

module.exports = {
	AuthProtectRouter,
	TokenAuth,
	login,
}
