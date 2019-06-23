
const express = require('express');
const constants = require('../../common/constants');
const User = require("../models/user")
const Test = require("../models/test/test")
const KEY = require('../utils/common')
const redis = require('redis')
const jsonwebtoken = require('jsonwebtoken');
const LOGIN =require('./login_logout/login')
const LOGOUT =require('./login_logout/logout')

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



function getInfo(req, res) {
	res.json({
		name: "admin",
		avatar: "a",
		code: constants.RetCode.SUCCESS
	})
}

function add_student(req,res) {
	console.log(req.body)
	console.log("add_student reciev a request")
	const username = req.body.username;
	const password = req.body.password;
	const token = req.body.token;
	//TODO if receive null info  sent a code:NULL_INFO_ERROR, null, "", nonNumber, undefind
	if(username==="" || password==="" || token===""){
		res.json({
			code:constants.RetCode.NULL_INFO_ERROR,
		})
	} else{
		User.create({
			username:username,
			password:password,
			weight: 3,
		}).then((admin, err) => {
			console.log(admin.toJSON().id);
			    id = admin.toJSON().id
				Test.create({
					username:username,
					userId: id,
				}).then( user => {
					res.json({
						code: constants.RetCode.SUCCESS,
					})
					console.log("add success!")
				})
			})
		.catch(err => {
			console.log("err", err)
		})
	}
}

function login(req, res){
 LOGIN.login(req,res);
}

function logout(req,res) {
	LOGOUT.logout(req,res);
}

function spaRender(req, res) {
	const xBundleUri = '/bin/player.zh_ch.bundle.js';
	const paramDict = {
		xBundleUri: constants.ROUTE_PATHS.BASE + xBundleUri,
	};
	res.render('index', paramDict);
}

function TokenAuth(req, res, next) {
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
						req.body.username = username
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

module.exports = {
	AuthProtectRouter,
	TokenAuth,
	login,
}
