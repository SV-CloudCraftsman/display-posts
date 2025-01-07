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
    <div className="container mt-4">
      <h2 className="mb-4">Posts</h2>

      {/* Form to Add a New Post */}
      <form onSubmit={addPost} className="mb-4">
        <div className="mb-3">
          <input
            type="text"
            name="title"
            className="form-control"
            placeholder="Enter title"
            value={newPost.title}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <textarea
            name="body"
            className="form-control"
            placeholder="Enter body"
            value={newPost.body}
            onChange={handleInputChange}
            rows="3"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Post
        </button>
      </form>

      <button onClick={fetchPosts} className="btn btn-secondary mb-4">
        Refresh Posts
      </button>

      {/* Render Posts */}
      <div className="row">
        {posts.map((post) => (
          <div key={post.id} className="col-md-6 mb-4">
            <PostItem
              id={post.id}
              title={post.title}
              body={post.body}
              onDelete={deletePost}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostList;
