const express=require('express');
const app=express();

app.use(express.json());

//getting db routes
const db=require('./db').db;
const msgModels=require('./db').msgModels;

const msg=express.Router();

msg
.route('/sendmsg')
.post(sendMsg)

async function sendMsg(req,res){
    console.log(req.body);
    try{let data=await msgModels.create(req.body);
    res.json({
        status:"ok",
        msg:data
    })}catch(err){
        res.json({
            status:err
        })
    }
}

msg
.route('/getmsg/:itemId')
.get(getMsg)

async function getMsg(req,res){
    try{const itemId=req.params['itemId']
    console.log(itemId);
    let data=await msgModels.find({itemId:itemId});
    res.json({
        status:'ok',
        msg:data
    })}catch(err){
        res.json({
            status:err
        })
    }
}
msg
.route('/deletemany')
.post(deleteMany)
async function deleteMany(req,res){
    let data=await msgModels.deleteMany({itemId:""});
    res.json({
        msg:"done",
        data:data
    })
}

module.exports=msg;