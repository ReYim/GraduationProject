
const Information = require("../models/information")

const j = {
    "username":'mardanjan',
    "userId":'22',
    "sex":'0',
}
const a= undefined;
Information.create({                        //创建用户学籍表
    username : 'mardanjan',
    userId: a,

})
    .then(user => {

        console.log("add success!")
    })