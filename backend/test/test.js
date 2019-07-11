var jwt = require('jsonwebtoken');
var token = jwt.sign({ username: 'mardan',weight:'123' }, 'shhhhh');
console.log(token);


/*
var username ="mardan"
var userweight = "1"
const token1 = jwt.sign({
    exp: Math.floor(Date.now() / 1000) + (1),
    data: {name: username , weight: userweight}
}, '#&*(&(*jfsfj77888****a');

console.log(token1)
*/

const key = "#&*(&(*jfsfj77888****a";
const token2 = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NjEyODIwODQsImRhdGEiOnsibmFtZSI6Im1hcmRhbiIsIndlaWdodCI6IjEifSwiaWF0IjoxNTYxMjgyMDgzfQ.Z8tnntyk9Mfj6x4MQL28Mxo9rHHIFWoLIph8XnPtkpI\n";

jwt.verify(token2, key, (err, decodeInfo) => {

});



