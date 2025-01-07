import React, { useEffect, useState } from 'react';
import PostItem from './PostItem';
import Spinner from './Spinner';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newPost, setNewPost] = useState({ title: '', body: '' });

  // Fetch posts from API
  const fetchPosts = () => {
    setLoading(true);
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setPosts(data.slice(0, 10)); // Limit to 10 posts
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Handle form submission to add a new post
  const addPost = (e) => {
    e.preventDefault(); // Prevent page reload
    if (newPost.title.trim() === '' || newPost.body.trim() === '') {
      alert('Please fill out both fields.');
      return;
    }

    const newPostObject = {
      id: posts.length + 1, // Temporary ID for demo purposes
      title: newPost.title,
      body: newPost.body,
    };

    setPosts([newPostObject, ...posts]); // Add new post to the top of the list
    setNewPost({ title: '', body: '' }); // Reset form
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost((prev) => ({ ...prev, [name]: value }));
  };

  // Delete a post
  const deletePost = (id) => {
    const updatedPosts = posts.filter((post) => post.id !== id);
    setPosts(updatedPosts);
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <h2>Posts</h2>

      {/* Form to Add a New Post */}
      <form onSubmit={addPost} style={formStyle}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={newPost.title}
          onChange={handleInputChange}
          style={inputStyle}
        />
        <textarea
          name="body"
          placeholder="Body"
          value={newPost.body}
          onChange={handleInputChange}
          style={{ ...inputStyle, height: '80px' }}
        />
        <button type="submit" style={buttonStyle}>
          Add Post
        </button>
      </form>

      <button onClick={fetchPosts} style={{ ...buttonStyle, marginBottom: '10px' }}>
        Refresh Posts
      </button>

      {/* Render Posts */}
      {posts.map((post) => (
        <PostItem
          key={post.id}
          id={post.id}
          title={post.title}
          body={post.body}
          onDelete={deletePost}
        />
      ))}
    </div>
  );
};

// Styles
const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  marginBottom: '20px',
};

const inputStyle = {
  marginBottom: '10px',
  padding: '10px',
  fontSize: '16px',
  border: '1px solid #ccc',
  borderRadius: '5px',
};

const buttonStyle = {
  padding: '10px 20px',
  backgroundColor: '#007BFF',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

export default PostList;
