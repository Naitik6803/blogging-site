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

// fetch posts which belongs to current user

Posts.post('/currentuser', async (req, res) => {
    try {
        const {userid}=req.body;
        const allPosts = await Post.find({author:userid}).populate('author');
        res.json(allPosts);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error retrieving posts' });
    }
});

// delete post

Posts.delete('/delposts/:postId', async (req, res) => {
    try {
        const postId = req.params.postId;
        const {userid}=req.body;
        console.log(postId);
        console.log(userid);
        const post = await Post.findOneAndDelete({
            _id: postId,
            author: userid,
        });

        if (post) {
            return res.json({ message: 'Post deleted successfully' });
        } else {
            return res.status(404).json({ error: 'You cant delete this post'});
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error deleting post' });
    }
});


// update post

Posts.put('/api/posts/:postId', async (req, res) => {
    try {
        const postId = req.params.postId;
        const {title,content}=req.body;
        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            {
                title:title,
                content: content,
            },
            { new: true }
        );
        if (updatedPost) {
            return res.json(updatedPost);
        } else {
            return res.status(404).json({ error: 'Post not found' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error updating post' });
    }
});


module.exports = Posts;