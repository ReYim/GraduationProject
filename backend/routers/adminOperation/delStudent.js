const MySQLManager = require('../../utils/MySQLManager');
const constants = require('../../../common/constants');
const Information = require("../../models/information");
const User =require("../../models/user");

function delStudent(req,res){
    if(req.body.userId===undefined || req.body.userId===null || req.body.userId===''){ //  检查是否合法性不只是检查是否是undefined，还有null等等。。。。。
        res.json({
            code:constants.RetCode.NULL_INFO_ERROR,
        })
    } else {
        // 删除学生时传入的ID不存在的话响应ID不存在
        User.findOne({
            where: {
                id: req.body.userId,
            }
        }).then(user => {
            console.log(user)
            if (user === null) {
                res.json({
                    code: constants.RetCode.ERROR_USERID,
                });
            } else {
                // 这里需要加transaction, 这次我帮你加上好好理解一下，在插入新用户时没有使用transaction所以导致可能user插入到数据库了，然而information并没有插入进去！！！！注意！！！！
                const userId = req.body.userId;
                const myDate = new Date();
                const updataValues = {
                    delete_at: myDate.toString(),
                }
                return MySQLManager.transaction(t => {
                    return Information
                        .update(
                            updataValues,
                            {
                                where: {
                                    userId: userId,
                                },
                                transaction: t,
                            }
                        )
                        .then(() => {
                            return User.update(
                                updataValues,
                                {
                                    where: {
                                        id: userId,
                                    },
                                    transaction: t
                                }
                            )
                        })
                })
                    .then(() => {
                        res.json({
                            code: constants.RetCode.SUCCESS,
                        })
                    })
                    .catch(err => {
                        console.log(err);
                        res.json({
                            code: constants.RetCode.UNKNOWN_ERROR,
                        })
                    });
            }
        });
    }
}

module.exports.delStudent = delStudent;

