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



/*

//console.log(client.get("admin",(err,reply)=>{ return reply}))
 const a =client.get('admin',(err,reply)=>{
 console.log(reply)

 })
*/
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
client=redis.createClient();
client.on('ready',(err)=>{
    console.log('redis is ready!')
})

get_token('admin').then(val => {

})







//TODO 暴露方法
module.exports.setUserToken=setUserToken

