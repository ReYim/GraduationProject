const constants = require('../../../common/constants');
const Information = require("../../models/information");

function update(req,res){
    if(req.body.userId===undefined  ){
        res.json({
            code : constants.RetCode.NULL_INFO_ERROR,
        })
    }else{
        const userId = req.body.userId;
        const  updataValues = {
            // username         :  req.body.username, //username cant be changed
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

        };
        Information.update( updataValues,{
            where:{
                userId: userId,
            }
        }).then((result)=>{
            if(result[0]===1 || result===1){
                console.log("update success! ");
                res.json({
                    code: constants.RetCode.SUCCESS,
                })
            }else if(result[0]===0 || result ===0){
                console.log("from update : update SQL information failure !  the result is :"+result);
                res.json({
                    code: constants.RetCode.NOT_FOUND_TOKEN,
                })
            }else {
                console.log("from update : this is the other error , i do not know what happen ! the result is :" +　result[0]);
                res.json({
                    code: constants.RetCode.UNKNOWN_ERROR,
                })
            }
        })
    }
}

module.exports.update=update;