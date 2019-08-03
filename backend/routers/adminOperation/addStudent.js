const constants = require('../../../common/constants');
const User = require("../../models/user");
const SQLManager = require('../../utils/MySQLManager');
const Information = require("../../models/information");

function add_student(req,res) {
    let studentname ='' ;
    let studentpass ='';
    if(req.body.studentname===undefined || req.body.studentpass===undefined || req.body.studentpass===null ){  //whether the variable is empty
        res.json({
            code : constants.RetCode.NULL_INFO_ERROR,
        })
    }else{
         studentname = req.body.studentname;
         studentpass = req.body.studentpass;
         //判断一下账号密码格式
        if(studentname==="" || studentpass==="" ){
            res.json({
                code:constants.RetCode.NULL_INFO_ERROR,
            })
        } else{ //看看有没有存在这个用户
            User.findOne({
                where:{
                    username: studentname,
                    delete_at:null,        //是否被删除
                }
            }).then(user => {
                if (user ===  null) {
                    //transe action
                    return SQLManager.transaction(t => {
                        return User.create({
                            username: studentname,
                            password: studentpass,
                            weight: 3,
                        },{transaction: t}).then(insertedStudent => {
                            return Information.create({
                                username: insertedStudent.username,
                                userId: insertedStudent.id,
                                sex: req.body.sex,
                                nation: req.body.nation,
                                major: req.body.major,
                                id_card: req.body.id_card,
                                address: req.body.address,
                                is_army: req.body.is_army,
                                origin: req.body.origin,
                                type: req.body.type,
                                phone: req.body.phone,
                                house_address: req.body.house_address,
                                permanent_address: req.body.permanent_address,
                                drop_out_history: req.body.drop_out_history,
                                leave_history: req.body.leave_history,
                                szzlb: req.body.szzlb,
                                change_major: req.body.change_major,
                                xycf: req.body.xycf,
                                job: req.body.job,
                                winning_record: req.body.winning_record,
                                scfjljdj: req.body.scfjljdj,
                                sfbjfchjyy: req.body.sfbjfchjyy,
                                sfbxxlrzdgzdx: req.body.sfbxxlrzdgzdx,
                                jtsfsa: req.body.jtsfsa,
                                sajsmqqk: req.body.sajsmqqk,
                                jtszpcslxfs: req.body.jtszpcslxfs,
                                jtszsqjlxfs: req.body.jtszsqjlxfs,
                                scycrjzjlb: req.body.scycrjzjlb,
                                crjzjsfsjxx: req.body.crjzjsfsjxx,
                                wsjyy: req.body.wsjyy,
                                zxztbx: req.body.zxztbx,
                                jydw: req.body.jydw,
                            },{transaction: t})
                        })
                    }).then(()=>{
                        res.json({
                            code: constants.RetCode.SUCCESS,
                        });
                    })
                }else{
                    res.json({
                        code:constants.RetCode.USER_EXIST, //用户已经存在
                    });
                }
            });
        }
    }
}
module.exports.add_student = add_student;