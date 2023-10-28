import React, { useState, useEffect } from 'react';
import './mainPage.css';
import Navbar from "./Navbar";

const MainPage = ({user,setUser,posts,setPosts,history}) => {
    useEffect(() => {
        const fetchPosts = async () => {
            const res = await fetch('/showpost');
            const data = await res.json();
            setPosts(data);
            console.log("Heey");
            console.log(posts);
        };
        fetchPosts();
    }, []);

    return (
        <>
            <Navbar user={user} setUser={setUser} posts={posts} setPosts={setPosts} history={history}/>

        <div className="container">
            <h1 className="heading">Blogging Site</h1>
            <div className="posts">
                {posts.map((post) => (
                    <div key={post._id} className="post">
                        <div className="post-author">
                            <p className="author-name">Author: {post.author.name}</p>
                        </div>
                        <h2 className="post-title">{post.title}</h2>
                        <p className="post-content">{post.content}</p>

                    </div>
                ))}
            </div>
        </div>
        </>
    );
};

export default MainPage;
