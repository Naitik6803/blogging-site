const express = require('express');
const mongoose= require('mongoose');
const db = require("./db");
const Post=db.Post;
const Posts=express.Router();
const Author=db.user;



// make new post

Posts.post('/newpost',async (req,res)=>{
    const {title,content,author}=req.body;
    if(!title || !content || !author){
        return res.status(422).json({error: "Please fill details correctly!"});
    }
    try{
        const Entry= new Post({title,content,author});
        await Entry.save();
        console.log(Entry);
        return res.status(200).json({message: "Posted !"});

    }
    catch{
        res.status(501);
    }
});

// fetch all posts

Posts.get('/showpost', async (req, res) => {
    try {
        const allPosts = await Post.find().populate('author');
        console.log(allPosts);
        res.json(allPosts);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error retrieving posts' });
    }
});



// delete post

// posts.post('/deletepost',async (req,res)=>{
//     const {author}=req.body;
//     if(!author){
//         return res.status(422).json({error: "Please fill details correctly!"});
//     }
//     try{
//         const
//
//     }
//     catch{
//         res.status(501);
//     }
// });



module.exports = Posts;