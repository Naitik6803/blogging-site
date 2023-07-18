import React, { useState, useEffect } from 'react';
import './mainPage.css';
import Navbar from "./Navbar";

const MainPage = ({user,setUser,posts,setPosts}) => {
    const [authors, setAuthors] = useState([]);
    // show author
    const fetchAuthor = async () => {
        try {
            // Get all unique author IDs from the posts
            const authorIds = [...new Set(posts.map(post => post.author))];
            console.log("mann ",posts);
            console.log("All ids", authorIds);
            // Fetch author details for each unique author ID
            const authorData = await Promise.all(
                authorIds.map(async authorId => {
                    const response = await fetch(`/author/${authorId}`);
                    const author = await response.json();
                    return author;
                })
            );
            setAuthors(authorData);
            // console.log(user.email);
            console.log("hehe",authors);
        } catch (error) {
            console.error('Error retrieving author:', error);
        }
    };
    const getPosts =async ()=>{
        const val= await fetch('/showpost',{
            method:'GET',
            headers:{
                "Content-type":"application/json",
            },
        });
        console.log("vval", val);
        const data=val.json();
        console.log("Bruh",data);
        setPosts(data);
        console.log("lilu", posts);

    };


// show posts
    useEffect(()=>{
        getPosts();
        fetchAuthor();
    },[user,posts]);




    // const handleUpdate = (postId) => {
    //     // Check if the user is the author of the post
    //     const postToUpdate = posts.find((post) => post._id === postId);
    //     if (postToUpdate && postToUpdate.author === user) {
    //         // Perform update operation
    //         // ...
    //         console.log(`Update post ${postId}`);
    //     } else {
    //         console.log("You are not authorized to update this post.");
    //     }
    // };
    //
    // const handleDelete = (postId) => {
    //     // Check if the user is the author of the post
    //     const postToDelete = posts.find((post) => post._id === postId);
    //     if (postToDelete && postToDelete.author === user) {
    //         // Perform delete operation
    //         // ...
    //         console.log(`Delete post ${postId}`);
    //     } else {
    //         console.log("You are not authorized to delete this post.");
    //     }
    // };

    return (
        <>
            {/*<Navbar props={{user,setUser}}/>*/}
        <div className="container">

            <h1>Post List</h1>
            {posts.map((post) => {
                const author=authors.find(author=> author._id === post.author);

                return(
                <div className="post" key={post._id}>
                    <h2>{post.title}</h2>
                    <p>{post.content}</p>
                    <p>Author: {author.email}</p>
                    {user.email === author.email && (
                        <div>
                            {/*<button onClick={() => handleUpdate(post._id)}>Update</button>*/}
                            {/*<button onClick={() => handleDelete(post._id)}>Delete</button>*/}
                        </div>
                    )}
                    <hr />
                </div>
            );
            })}
        </div>
        </>
    );
};

export default MainPage;
