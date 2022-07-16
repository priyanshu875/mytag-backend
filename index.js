const express=require('express');
const app=express();
const cors=require('cors');
require('dotenv').config();
app.use(cors());
const db=require('./routes/db').db;//require db for mongoose connection

const auth=require('./routes/auth');//require auth route
const operation=require('./routes/operation');//require operation route
const msg=require('./routes/msg');//require sendmsg

app.use(express.json());

app.use('/auth',auth);//auth route
app.use('/operation',operation)//operation route
app.use('/msg',msg)//sendmsg route



app.get('/',(req,res)=>{
    res.send('at index js')
})



app.listen( process.env.PORT || 3001,()=>{
    console.log('server started');
})
