import React, { useState } from 'react';

const PostForm = ({ addPost }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validation and error handling can be added here

        // Create a new post object
        const newPost = {
            title: title,
            content: content,
        };

        // Call the addPost function passed as a prop to update the posts
        addPost(newPost);

        // Reset the form fields
        setTitle('');
        setContent('');
    };

    return (
        <div>
            <h2>Create a New Post</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div>
                    <label>Content:</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    ></textarea>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default PostForm;
