const express=require('express');
const app=express();

app.use(express.json());

//getting db routes
const db=require('./db').db;
const userModels=require('./db').userModels;
const itemModels=require('./db').itemModels;

const operation=express.Router();

//add item
operation
.route('/additem')
.post(addItem)

async function addItem(req,res){
    try{let data=await itemModels.create(req.body);
    res.json({
        status:'ok',
        item:data
    })}catch(err){
        res.json({
            sttaus:err
        })
    }
}


//get all items
operation
.route('/getallitems')
.get(getAllItems)

async function getAllItems(req,res){
    try{const userId=req.headers['x-access-token'];
    let data=await itemModels.find({userId:userId});
    if(data.length>0){
        res.json({
            status:'ok',
            items:data
        })
    }else{
        res.json({
            status:'no-item-found'
        })
    }}catch(err){
        res.json({
            status:err
        })
    }
}


operation
.route('/getiteminfo/:itemId')
.get(getItemInfo)

async function getItemInfo(req,res){
    try{let data=await itemModels.findOne({_id:req.params.itemId})
    res.json({
        status:'ok',
        info:data
    })}catch(err){
        res.json({
            status:err
        })
    }
}

module.exports=operation;


