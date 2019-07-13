
const constants = require('../../../common/constants');
const Information = require("../../models/information");
const User =require("../../models/user");

function delStudent(req,res){
    if(req.body.userId===undefined){
        res.json({
            code:constants.RetCode.NULL_INFO_ERROR,
        })
    }
    else{
        const userId = req.body.userId;
        const myDate = new Date();
        const  updataValues = {
            delete_at:myDate.toString(),
        };
        Information.update( updataValues,{
            where:{
                userId: userId,
            }
        }).then( (result)=> {
            if (result[0] === 1 || result === 1) {
               User.update(updataValues,{
                   where: {
                       id:userId,
                }
               }).then(result2=>{
                   if(result2[0]===1 || result2===1){
                       console.log("delete student success! ");
                       res.json({
                           code: constants.RetCode.SUCCESS,
                       })
                   }
                   else{
                       console.log(" error is in delStudent.js");
                       res.json({
                           code:constants.RetCode.UNKNOWN_ERROR,
                       })
                   }
               });
            }
            else{
                console.log(" error is in delStudent.js");
                res.json({
                    code:constants.RetCode.UNKNOWN_ERROR,
                })
            }
        }).catch(err=>{
            console.log(err);
            res.json({
                code:constants.RetCode.UNKNOWN_ERROR,
            })
        });
    }
}

module.exports.delStudent = delStudent;