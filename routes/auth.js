const express=require('express');
const app=express();
const jwt=require('jsonwebtoken');

app.use(express.json());

//getting db routes
const db=require('./db').db;
const userModels=require('./db').userModels;

const auth=express.Router();//initialize router

//signup user req
auth
.route('/signup')
.post(signUpUser)

async function signUpUser(req,res){
    // console.log(req.body);
    try{let data=await userModels.create(req.body);
        console.log(data);
    if(data){
        res.json({
            status:'ok',
            user:data
        })
    }}catch(err){
        res.json({
            status:err
        })
    }
    
}

//signin req OR login req
auth
.route('/signin')
.post(signInUser)

async function signInUser(req,res){
    try{let data=await userModels.findOne({email:req.body.email});
    if(data && data.password==req.body.password){
        // console.log(data._id);
        const token=jwt.sign({
            email:data.email,
            userId:data._id
            },'priyanshuag')

        res.json({
            status:'ok',
            user:token
        })
    }else{
        res.json({
            status:'wrong credentials'
        })
    }}catch(err){
        res.json({
            status:err
        })
    }
}


//logout req****
auth
.route('/logout')
.get(logOut)

async function logOut(req,res){
   
}


//exporting authRoute
module.exports=auth;

