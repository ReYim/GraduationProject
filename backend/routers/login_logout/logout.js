const constants = require('../../../common/constants');

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

module.exports.logout=logout;