
const constants = require('../../../common/constants');
const User = require("../../models/user")
const jwt = require('../../utils/jwt')


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

module.exports.login = login;