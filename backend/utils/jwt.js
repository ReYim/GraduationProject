const jwt = require('jsonwebtoken');
const redis = require('redis')

const two_days = 172800

const getToken = (username , userweight) =>{
    return jwt.sign({ name: username , weight: userweight }, 'shhhhh');
}

const setUserToken = (username , userweight) =>{
    client.set(username,getToken(username,userweight),'EX',two_days,function () {
    })
}

client=redis.createClient();
client.on('ready',(err)=>{
    console.log('redis is ready!')
})

//TODO 暴露方法
module.exports.setUserToken=setUserToken

