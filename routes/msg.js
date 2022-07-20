const express=require('express');
const { itemModels } = require('./db');
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
        console.log(data);
        console.log(data.createdAt);
        res.json({
            status:"ok",
            msg:data
        })

    }
    catch(err){
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
    // data.sort((a,b) => b.createdAt - a.createdAt);
    
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
.route('/deleteItem/:itemId')
.delete(deleteItem)

async function deleteItem(req,res){
    const itemId=req.params['itemId'];
    let data=await itemModels.findOneAndDelete({_id:itemId})
    res.json({
        status:"deleted"
    })
}

msg
.route('/deleteMsg/:msgId')
.delete(deleteMsg)

async function deleteMsg(req,res){
    const msgId=req.params['msgId'];
    let data=await msgModels.findOneAndDelete({_id:msgId})
    res.json({
        status:"deleted"
    })
}

msg
.route('/deletemany')
.post(deleteMany)
async function deleteMany(req,res){
    let data=await msgModels.deleteMany({itemId:"62c0c4f2b02d8cb22b9620fb"});
    res.json({
        msg:"done",
        data:data
    })
}

module.exports=msg;