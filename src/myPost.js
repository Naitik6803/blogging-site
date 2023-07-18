import React, { useState, useEffect } from 'react';

const MyPostsPage = ({user,setUser,posts, setPosts}) => {
    const [currposts, setCurrposts] = useState([]);
    useEffect(() => {
        const fetchPosts = async () => {
            const res = await fetch(`/currentuser`,{
                method:'POST',
                headers:{
                    "Content-type":"application/json",
                },
                body:JSON.stringify({
                    "userid":user.id,
                })
            });
            console.log(user);
            const data = await res.json();
            if(res.status===200){
                console.log("Collected !");
            }
            else{
                window.prompt("couldnt fetch!");
            }
            console.log(data);
            setCurrposts(data);
        };

        fetchPosts();
    }, [user,posts]);

    const handleDeletePost = async (postId) => {
        console.log(postId);
        try {
            const res = await fetch(`/delposts/${postId}`, {
                method: 'DELETE',
                headers:{
                    "Content-type":"application/json",
                },
                body:JSON.stringify({
                    "userid":user.id,
                }
                )
            });

            if (res.ok) {
                setPosts(posts.filter((post) => post._id !== postId));
                console.log('Post deleted successfully');
            } else {
                console.log('Failed to delete post');
            }
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    return (
        <div>
            <h2>My Posts</h2>
            {currposts.length === 0 ? (
                <p>No posts found</p>
            ) : (
                <ul>
                    {currposts.map((post) => (
                        <li key={post._id}>
                            <h3>{post.title}</h3>
                            <p>{post.content}</p>
                            <button onClick={() => handleDeletePost(post._id)}>Delete</button>

                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default MyPostsPage;
