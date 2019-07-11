const constants = require('../../../common/constants');
const User = require("../../models/user");

const Information = require("../../models/information");


function add_student(req,res) {
    let studentname ='' ;
    let studentpass ='';
    if(req.body.studentname===undefined || req.body.studentpass===undefined){  //whether the variable is empty
        res.json({
            code : constants.RetCode.NULL_INFO_ERROR,
        })
    }else{
         studentname = req.body.studentname;
         studentpass = req.body.studentpass;
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
                            if(err) throw err;
                            console.log(admin.toJSON().id);
                            const id = admin.toJSON().id;
                            Information.create({                        //创建用户学籍表
                                username: studentname,
                                userId: id,
                                sex: req.body.sex,
                                nation: req.body.nation,
                                major:req.body.major,
                                id_card:req.body.id_card,
                                address:req.body.address,
                                is_army:req.body.is_army,
                                origin:req.body.origin,
                                type:req.body.type,
                                phone:req.body.phone,
                                house_address:req.body.house_address,
                                permanent_address:req.body.permanent_address,
                                drop_out_history:req.body.drop_out_history,
                                leave_history:req.body.leave_history,
                                szzlb:req.body.szzlb,
                                change_major:req.body.change_major,
                                xycf:req.body.xycf,
                                job:req.body.job,
                                winning_record:req.body.winning_record,
                                scfjljdj:req.body.scfjljdj,
                                sfbjfchjyy:req.body.sfbjfchjyy,
                                sfbxxlrzdgzdx:req.body.sfbxxlrzdgzdx,
                                jtsfsa:req.body.jtsfsa,
                                sajsmqqk:req.body.sajsmqqk,
                                jtszpcslxfs:req.body.jtszpcslxfs,
                                jtszsqjlxfs:req.body.jtszsqjlxfs,
                                scycrjzjlb:req.body.scycrjzjlb,
                                crjzjsfsjxx:req.body.crjzjsfsjxx,
                                wsjyy:req.body.wsjyy,
                                zxztbx:req.body.zxztbx,
                                jydw:req.body.jydw,
                            })
                                .then(user => {
                                    res.json({
                                        code: constants.RetCode.SUCCESS,
                                    });
                                    console.log(user.toJSON().username + "is  add success!")
                                })
                        })
                        .catch(err => {
                            console.log("err", err);
                            res.json({
                                code: constants.RetCode.UNKNOWN_ERROR,
                            });
                        });
                } else {  //如果存在就返回错误码
                    res.json({
                        code: constants.RetCode.USER_EXIST,
                    });
                }
            })
        }
    }
}
module.exports.add_student = add_student;