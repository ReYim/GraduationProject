const jwt = require('jsonwebtoken');


const getToken = (username , userweight) =>{
    return jwt.sign({ name: username , weight: userweight }, 'shhhhh');
}


//TODO 暴露方法
module.exports.getToken=getToken();