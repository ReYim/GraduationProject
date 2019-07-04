
const express = require('express');
const constants = require('../../common/constants');
const User = require("../models/user")
const Test = require("../models/test/test")


const userId = 5;
const  sex=1;
const  name ='abliz'
//const update_test = { name : 'alim'};
const  updataValues = {
    name: name,
    sex: sex,
}
Test.update( updataValues,{
        where:{
            userId: userId,
        }
}).then((result)=>{
    console.log("update result :")
    console.log(result);
    if(result==1){
        console.log("update success!")
    }else{
        console.log("update faild!")
    }
})
