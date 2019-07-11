const constants = require('../../../common/constants');
const Test = require("../../models/test/test")
const Information = require("../../models/information/information")

function update_test(req,res) {
    const userId = req.body.userId;
    const  updataValues = {
        name: req.body.name,
        sex : req.body.sex,
    }
    Test.update( updataValues,{
        where:{
            userId: userId,
        }
    }).then((result)=>{
        console.log("update result :")
        console.log(result);
        if(result==1){
            res.json({
                code: constants.RetCode.SUCCESS,
            })
        }else{
            res.json({
                code: constants.RetCode.UNKNOWN_ERROR,
            })
        }
    })
}

function update(req,res){
    const userId = req.body.userId;
    const  updataValues = {
       // username         :  req.body.username,
        name             :  req.body.name,
        sex              :  req.body.sex,
        nation           :  req.body.nation,
        major            :  req.body.major,
        id_card          :  req.body.id_card,
        address          :  req.body.address,
        is_army          :  req.body.is_army,
        origin           :  req.body.origin,
        type             :  req.body.type,
        phone            :  req.body.phone,
        house_address    :  req.body.house_address,
        permanent_address:  req.body.permanent_address,
        drop_out_history :  req.body.drop_out_history,
        leave_history    :  req.body.leave_history,
        szzlb            :  req.body.szzlb,
        change_major     :  req.body.change_major,
        xycf             :  req.body.xycf,
        job              :  req.body.job,
        winning_record   :  req.body.winning_record,
        scfjljdj         :  req.body.scfjljdj,
        sfbjfchjyy       :  req.body.sfbjfchjyy,
        sfbxxlrzdgzdx    :  req.body.sfbxxlrzdgzdx,
        jtsfsa           :  req.body.jtsfsa,
        sajsmqqk         :  req.body.sajsmqqk,
        jtszpcslxfs      :  req.body.jtszpcslxfs,
        jtszsqjlxfs      :  req.body.jtszsqjlxfs,
        scycrjzjlb       :  req.body.scycrjzjlb,
        crjzjsfsjxx      :  req.body.crjzjsfsjxx,
        wsjyy            :  req.body.wsjyy,
        zxztbx           :  req.body.zxztbx,
        jydw             :  req.body.jydw,

    }
    Information.update( updataValues,{
        where:{
            userId: userId,
        }
    }).then((result)=>{
        console.log("update result :")
        console.log(result);
        if(result==1){
            res.json({
                code: constants.RetCode.SUCCESS,
            })
        }else{
            res.json({
                code: constants.RetCode.UNKNOWN_ERROR,
            })
        }
    })
}

module.exports.update_test=update_test;
module.exports.update=update;