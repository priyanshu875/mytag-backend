const mongoose =require('mongoose');
const db_link="mongodb+srv://stvpri:agarwal@cluster0.gl67y.mongodb.net/?retryWrites=true&w=majority"

let db=mongoose.connect(db_link)
.then(function(){
    console.log('db connected');
})
.catch(function(err){
    if(err){
        console.log(err);
    }
})

//usermodel
const userModels=mongoose.model('userModels',mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    }
}))


//itemModel
const itemModels=mongoose.model('itemModels',mongoose.Schema({
    userId:{
        type:String
    },
    itemName:{
        type:String
    },
    itemDescription:{
        type:String
    }
}))


//msgmodel
const msgModels=mongoose.model('msgModels',mongoose.Schema({
    itemId:{
        type:String
    },
    senderName:{
        type:String
    },
    senderContact:{
        type:String
    },
    senderAddress:{
        type:String
    },
    senderMessage:{
        type:String
    },
    imageUrl:{
        type:String
    }
}))


///exporting
module.exports={
    db,
    userModels,
    itemModels,
    msgModels
};