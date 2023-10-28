const mongoose = require('mongoose');
const {contentDisposition} = require("express/lib/utils");
const bcrypt =require('bcryptjs');
const DB=process.env.DATABASE;

mongoose.connect(DB).then(()=>{
    console.log("DB connected!");
}).catch((err)=>{
    console.log(`Can't connect, error : ${err}`);
});

// schema skeleton
const schema=new mongoose.Schema({
    name:{
        type:String,
        require: true,
    },
    email:{
        type:String,
        require: true,
        unique: true,
    },
    password:{
        type:String,
        require: true,
    }
});

// do this before saving schema
schema.pre('save',async function(next){
    if(this.isModified('password')){
        this.password=await bcrypt.hash(this.password,12);
    }
    next();
});
const user= mongoose.model('user',schema);


const schema2= new mongoose.Schema({
    title:{
        type:String,
        require:true,
    },
    content:{
        type:String,
        require:true,
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
    },
});
const Post=mongoose.model('Post',schema2);
// // Test updation
// const newuser= new user({
//     name:'abc',
//     email: '11aa',
//     password:"111",
// });
// newuser.save().then(()=>{
//     console.log("added");
// }).catch((err)=>{
//     console.log(`can't add  error : ${err}`);
// });
// //
//

// // Test updation
// const newpost= new Post({
//     title:'Supp',
//     content: 'hellooo',
//     author:'64b6cd215807ac4680795285',
// });
// newpost.save().then(()=>{
//     console.log("added");
// }).catch((err)=>{
//     console.log(`can't add  error : ${err}`);
// });



module.exports={user,Post};

