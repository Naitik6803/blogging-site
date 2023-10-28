import React, { useState } from 'react';
import './newPost.css'
const PostForm = ({ user, setUser }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

// posting
    const Submit= async (e)=>{
        e.preventDefault();
        const res= await fetch('/newpost',{
            method:'POST',
            headers:{
                "Content-type":"application/json",
            },
            body:JSON.stringify({
                "title":title,
                "content":content,
                "author":user.id,
            })
        });
        const data= await res.json();
        console.log(data);
        if(res.status===200){
            console.log("Posted !");
        }
        else{
            window.prompt("Please enter valid details!");
        }
        setTitle('');
        setContent('');
    };

    return (
        <div className="post-form">
            <h2 className="form-heading">Create a New Post</h2>
            <form onSubmit={Submit}>
                <div className="form-group">
                    <label className="form-label">Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Content:</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="form-textarea"
                    ></textarea>
                </div>
                <button type="submit" className="form-submit-btn">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default PostForm;
