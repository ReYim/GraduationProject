
const express = require('express');
const constants = require('../../common/constants');
const KEY = require('../utils/common')
const redis = require('redis')
const jsonwebtoken = require('jsonwebtoken');
const login =require('./loginAndLogout/login')
const logout =require('./loginAndLogout/logout')

const addStudent = require('./adminOperation/addStudent')
const updateStudent = require('./adminOperation/updateStudent')
const getStudent = require('./adminOperation/getStudent');
const getStudentList = require('./adminOperation/getStudentList');
const delStudent = require('./adminOperation/delStudent');

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
AuthProtectRouter.post("/add-student", addStudent.add_student);
AuthProtectRouter.post("/logout", logout.logout);
AuthProtectRouter.get("/info", getInfo);
AuthProtectRouter.post("/update",updateStudent.update);
AuthProtectRouter.post("/get-one",getStudent.getStudent);
AuthProtectRouter.post("/list",getStudentList.getStudentList);
AuthProtectRouter.post("/del",delStudent.delStudent);



function getInfo(req, res) {
	res.json({
		name: "admin",
		avatar: "a",
		code: constants.RetCode.SUCCESS
	})
}


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
