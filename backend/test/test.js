

const Information = require("../models/information");
const User =require("../models/user");
const SQLManager = require('../utils/MySQLManager');

return SQLManager.transaction(t=>{
    return User.create({
        username:'test',
        password:'123456',
        weight:3,
    }).then(result=>{
            console.log(result);
            return Information.create({
                username:'test',
                userId:result.id,
            })
        })
    })