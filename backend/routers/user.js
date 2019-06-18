const baseAbsPath = __dirname + '/';
const express = require('express');
const Promise = require('bluebird');
const constants = require('../../common/constants');
const User = require("../models/user")
const MySQLManager = require('../utils/MySQLManager');
const jwt = require('../utils/jwt')
const redis = require('redis')
//todo start redis client
client=redis.createClient();
client.on('ready',(err)=>{
	console.log('redis is ready!')
})


const AuthProtectRouter = express.Router({
	mergeParams: true
});

AuthProtectRouter.post("/login", login);  //handle login request
AuthProtectRouter.get("/info", getInfo);


function getInfo(req, res) {
	res.json({
		name: "admin",
		avatar: "a",
		code: constants.RetCode.SUCCESS
	})
}

function login(req, res){
	console.log(req.body)
	const username = req.body.username;
	const password = req.body.password;

	//TODO 判断前端发送的帐号号和密码是否为空
	if(username==='' || password===''){
		res.json({
             code:constants.RetCode.NULL_INFO_ERROR,
		})
		res.end()
	}

	User.findOne({
		  where:{
				username: username,
			}
	})
	.then(user => {
		//todo 判断用户密码
		if(user!= null && user.password == password) {
			userJson = user.toJSON()
			jwt.setUserToken(username, user.weight)
			client.get(username, (err,reply)=>{
				if(err){   //todo 如果从REDIS获取jwt失败就响应错误码
					res.json({
						code:constants.RetCode.REDIS_ERROR,
					})
				} else {
					res.json({
						code: constants.RetCode.SUCCESS,
						token: reply,
					})
				}
			})
		} else {
			res.json({
				code: constants.RetCode.PASSWORD_ERROR,
			})
		}
	 });
}

const PageRouter = express.Router({
	mergeParams: true
});

PageRouter.get("/test", spaRender);

function spaRender(req, res) {
	const xBundleUri = '/bin/player.zh_ch.bundle.js';
	const paramDict = {
		xBundleUri: constants.ROUTE_PATHS.BASE + xBundleUri,
	};
	res.render('index', paramDict);
}

function TokenAuth(req, res, next) {
	token = req.body.token || req.query.token;
	//TODO 验证
	/* 
	 * pase := getWeight(0, token) //返true||false
	 *
	 *
	 * */
	next()
}

module.exports = {
	PageRouter,
	AuthProtectRouter,
	TokenAuth,
}
