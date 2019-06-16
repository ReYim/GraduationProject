const baseAbsPath = __dirname + '/';
const express = require('express');
const Promise = require('bluebird');
const constants = require('../../common/constants');
const User = require("../models/user")
const MySQLManager = require('../utils/MySQLManager');
const jwt = require('../utils/jwt')


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
	
	User.findOne({
		  where:{
				username: account,
			}
	})
	.then(user => {
		//todo 判断用户密码
		if(user!= null && user.password == password) {
			userjson = user.tojson()
			res.json({
				ret: constants.RetCode.SUCCESS,
                userWeight: userJson.weight,
				userToken: jwt.getToken(account,userJson.weight),
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
