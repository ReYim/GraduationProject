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

AuthProtectRouter.post("/login", login);
AuthProtectRouter.get("/sign", sign);

function sign(req, res) {
	//TODO
}

function login(req, res){
	const account = req.body.account;
	const password = req.body.password;

	//TODO 判断前端发送的帐号号和密码是否为空
    var userJson
	User.findOne({
		  where:{
				username: account,
			}
	})
	.then(user => {
		//todo 判断用户密码
		if(user!= null && user.password == password) {
			userJson = user.toJSON()
			jwt.setUserToken(account,user.weight)
			client.get(account,(err,reply)=>{
			    if(err){
			        console.log("redis error ! cannot get the json web token from redis!")
                        res.json({
                            ret:constants.RetCode.REDIS_ERROR,
                        })
                }
				res.json({
					ret: constants.RetCode.SUCCESS,
					userWeight: userJson.weight,
					userToken: reply,
				})
			})
		} else {
			res.json({
				ret: constants.RetCode.PASSWORD_ERROR,
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

module.exports = {
	PageRouter,
	AuthProtectRouter,
}
