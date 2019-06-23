const baseAbsPath = __dirname + '/';
const express = require('express');
const Promise = require('bluebird');
const constants = require('../../common/constants');
const User = require("../models/user")
const Test = require("../models/test/test")
const MySQLManager = require('../utils/MySQLManager');
const jwt = require('../utils/jwt')
const KEY = require('../utils/common')
const redis = require('redis')
var jsonwebtoken = require('jsonwebtoken');

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

function logout(req,res) {
    let username = req.body.username;
	client.del(username,(err)=>{    //这里要根据TOKEN注销用户，从REDIS删除
		if(err){
			console.log(err)
			res.json({
				code:constants.RetCode.REDIS_ERROR,
			})
		} else{
			console.log("success!")
			res.json({
				code:constants.RetCode.SUCCESS,
			})
		}
	})
}

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
	console.log(req.body)
	const username = req.body.username;
	const password = req.body.password;

	//TODO 判断前端发送的帐号号和密码是否为空
	if(username==='' || password===''){
		return res.json({
             code:constants.RetCode.NULL_INFO_ERROR,
		})
	}
	User.findOne({
      where:{
            username: username,
        }
	})
	.then(user => {
		//判断用户密码
		if(user!= null && user.password == password) {
			let userJson = user.toJSON()
			jwt.setUserToken(username, user.weight)
            .then(() => {
				client.get(username, (err,reply)=>{
					if(err){   //todo 如果从REDIS获取jwt失败就响应错误码
						res.json({
							code:constants.RetCode.REDIS_ERROR,
						})
					}
					else{
						res.json({
							code: constants.RetCode.SUCCESS,
							token: reply,
						})
					}
				})
            }).catch(err => {
				console.log(err)
				res.json({
					code: -11111,
				})
			});
		} else {
			res.json({
				code: constants.RetCode.PASSWORD_ERROR,
			})
		}
	 });
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
