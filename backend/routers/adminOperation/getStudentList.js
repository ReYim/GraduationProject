const User = require("../../models/user");
const constants = require('../../../common/constants');

function getStudentList(req, res) {
    //没有perNum的情况下，每个页默认有20个数据
    //没有perNum 也没有页码就返回1-20个数据
    if( (req.body.perNum === undefined ) &&  (req.body.page===undefined) ){
            User.findAll({
                attributes: ['username', 'id','weight'],
                where: {
                    delete_at: null,
                },
            }).then(user=>{
                if(user===null){
                    req.json({
                        code : constants.RetCode.SQL_ERROR,
                    })
                }
                else{
                    const totalCount = user.length;
                    let array = [ ];
                    for(let i =0 ; i<20 ; i++){
                        const key =  i ;
                        if(user[key]!=null){
                            array[i]=user[key];
                        }
                    }
                    res.json({
                        code:constants.RetCode.SUCCESS,
                        totalCount : totalCount,
                        userList:array,
                    });
                }
            });
        }
    else{
        if(req.body.page<=0 || req.body.perNum<=0){
            res.json({
                code: constants.RetCode.NULL_INFO_ERROR,
            })
        }else{
            User.findAll({
                attributes: ['username', 'id','weight'],
                where: {
                    delete_at: null,
                },
            }).then(user=>{
                if(user===null){
                    req.json({
                        code : constants.RetCode.SQL_ERROR,
                    });
                }
                else{
                    const perNum = req.body.perNum;
                    const totalCount = user.length;
                    const p = req.body.page;
                    const page = p -1 ;
                    const maxPage = totalCount/perNum;
                    let array = [ ];
                    let currentNum = (page === maxPage) ? totalCount%perNum  : perNum; //这是当前页面的数据数量,是否为最后一页
                     for(let i =0 ; i<currentNum ; i++){
                            const key = page * perNum + i ;
                            if(user[key]!=null){
                                array[i]=user[key];
                            }
                     }
                     res.json({
                         code:constants.RetCode.SUCCESS,
                         totalCount : totalCount,
                         userList:array,
                     })
                }
            })
        }
    }
}
module.exports.getStudentList=getStudentList;