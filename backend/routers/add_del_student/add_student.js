
const constants = require('../../../common/constants');
const User = require("../../models/user")
const Test = require("../../models/test/test")


function add_student(req,res) {
    const studentname = req.body.studentname;
    const studentpass = req.body.studentpass;
    //TODO if receive null info  sent a code:NULL_INFO_ERROR, null, "", nonNumber, undefind
    if(studentname==="" || studentpass==="" ){
        res.json({
            code:constants.RetCode.NULL_INFO_ERROR,
        })
    } else{
        User.findOne({
            where:{
                username: studentname,
            }
        }).then(user => {
            if (user === null) {   //如果不存在这个用户就直接加入
                console.log("user is null");
                User.create({                    //创建用户账户
                    username: studentname,
                    password: studentpass,
                    weight: 3,
                })
                    .then((admin, err) => {
                        console.log(admin.toJSON().id);
                        const id = admin.toJSON().id
                        Test.create({                        //创建用户学籍表
                            username: studentname,
                            userId: id,
                        })
                            .then(user => {
                                res.json({
                                    code: constants.RetCode.SUCCESS,
                                })
                                console.log("add success!")
                            })
                    })
                    .catch(err => {
                        console.log("err", err)
                    })

            } else {  //如果存在就返回错误码
                res.json({
                    code: constants.RetCode.USER_EXIST,
                })
            }
        })
    }
}
module.exports.add_student = add_student;