const redis = require('redis');

const constants = require('../../../common/constants');
const User = require("../../models/user");
const jwt = require('../../utils/jwt');

function login(req, res){
    if(req.body.username===undefined || req.body.password===undefined || req.body.username==='' || req.body.password===''){
        res.json({
            code: constants.RetCode.NULL_INFO_ERROR,
        })
    }else{
        const username = req.body.username;
        const password = req.body.password;
        User.findOne({
            where:{
                username: username,
            }
        })
            .then(user => {
                if(user!= null && user.password === password) {    // is the user exist
                    jwt.setUserToken(username, user.weight)
                        .then(() => {
                            redis.createClient().get(username, (err,reply)=>{
                                if(err){
                                    res.json({
                                        code:constants.RetCode.REDIS_ERROR,
                                    })
                                } else{
                                    res.json({
                                        code: constants.RetCode.SUCCESS,
                                        token: reply,
                                    })
                                }
                            })
                        }).catch(err => {
                        console.log(err);
                        res.json({
                            code: constants.RetCode.UNKNOWN_ERROR,
                        })
                    });
                } else {
                    res.json({
                        code: constants.RetCode.PASSWORD_ERROR,
                    })
                }
            });
    }
}
module.exports.login = login;