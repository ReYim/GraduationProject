const constants = require('../../../common/constants');

function logout(req,res) {
    if( req.body.username === undefined ){
        res.json({
            code: constants.RetCode.NULL_INFO_ERROR,
        });
    }else{
        let username = req.body.username;
        client.del(username,(err)=>{    // delete token of user from redis
            if(err){
                console.log(err);
                res.json({
                    code:constants.RetCode.REDIS_ERROR,
                })
            } else{
                console.log(username +" log out success!");
                res.json({
                    code:constants.RetCode.SUCCESS,
                })
            }
        });
    }
}
module.exports.logout=logout;