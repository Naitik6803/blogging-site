const express= require('express');
const auth=express.Router();
const db = require("./db");
const bcrypt = require("bcryptjs");
const user= db.user;
auth.get('/',(req, res)=>{
    res.send('Hello');
});

// compare if two hashed passwords matches
const checkpassword= async (a,b)=>{
    try{
        const match= await bcrypt.compare(a,b);
        return match;
    }
    catch(error){
        console.log(error);
        return false;
    }
}

// sign up
auth.post('/register',async (req, res)=>{
    const {name, email,password}=req.body;
    if(!name || !email || !password){
        return res.status(422).json({error: "Please fill details correctly!"});
    }

    try{
        const Userregister= await user.findOne({email:email});
        if(Userregister){
            return res.status(302).json({error:"User already registered!"});
        }
        const Entry=new user({name,email,password});
        await Entry.save();
        console.log(Entry);
        res.status(200).json({message: "User registered !",name:Entry.name,email:Entry.email,id:Entry._id});
    }
    catch{
        res.status(501);
    }
});

// signin
auth.post('/signin',async (req, res)=>{
        try{
            let {email,password}=req.body;
            console.log(email,password);
            if(!email || !password){
                return res.status(501).json({error:"Invalid input"});
            }
            const userLogin= await user.findOne({email:email});

            if(userLogin){
                const ismatch= await checkpassword(password,userLogin.password);
                if(ismatch){
                    res.status(200).json({message: "User found", name:userLogin.name,email:userLogin.email,id:userLogin._id});
                    console.log(userLogin);
                }
                else res.status(404).json({message : "Invalid credentials!"});

            }
            else res.status(404).json({message : "Invalid credentials!"});
        }

        catch(err){
            console.log(err);
        }
})
module.exports=auth;