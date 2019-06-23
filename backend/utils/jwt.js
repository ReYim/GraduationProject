const jwt = require('jsonwebtoken');
const redis = require('redis')
const KEY = require('./common')

const two_days = 172800
const test_time = 3

const getToken = (username , userweight) =>{
    //return jwt.sign({ name: username , weight: userweight }, 'shhhhh');
    return jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        data: {username: username , weight: userweight}
    },KEY );
}



const setUserToken = (username , userweight) =>{
    return new Promise((resolve, reject) => {
        client.set(username,getToken(username,userweight),'EX',two_days,function (err) {
           if(err == null) {
               resolve()
           } else {
               reject(err)
           }
        })
    })
};



const get_token = username => {
    return new Promise((resolve, reject) => {
        client.get(username,(err, reply) => {
            if (err) {
                console.log('errr');
            } else {
                resolve(reply);
            }
        });
    });
};









//TODO 暴露方法
module.exports.setUserToken=setUserToken

