
const constants = require('../../../common/constants');
const Information = require("../../models/information");
const User =require("../../models/user");

function get_student(req,res) {
    if(req.body.userId === undefined){
        res.json({
            code: constants.RetCode.NULL_INFO_ERROR,
        });
    }else{
        User.findOne({
            where:{
                id:req.body.userId,
            }
        }).then(user => {
                if(user===null){
                    res.json({
                        code: constants.RetCode.USER_INEXISTENCE,
                    });
                }else{
                    Information.findOne({
                        where:{
                            userId:req.body.userId,
                        }
                    }).then( userInformation =>{
                        if(userInformation===null){
                            res.json({
                                code : constants.RetCode.USER_INEXISTENCE,
                            });
                        }else{
                            res.json({
                                code: constants.RetCode.SUCCESS,
                                user:user.toJSON(),
                                info:userInformation.toJSON(),
                            });
                        }
                    }).catch(err=>{
                        throw err;
                    })
                }
                }).catch( err =>{
                    throw err;
        });
    }
}

module.exports.get_student=get_student;