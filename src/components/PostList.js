import React, { useEffect, useState } from 'react';
import PostItem from './PostItem';
import Spinner from './Spinner';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newPost, setNewPost] = useState({ title: '', body: '' });
  const [page, setPage] = useState(1); // Current page
  const [totalPages, setTotalPages] = useState(0); // Total number of pages

  // Fetch posts with pagination
  const fetchPosts = (page) => {
    setLoading(true);
    fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`)
      .then((response) => {
        // Extract total posts count from the response headers
        const totalPosts = response.headers.get('x-total-count');
        setTotalPages(Math.ceil(totalPosts / 10)); // Assuming 10 posts per page

        // Return the response JSON data
        return response.json();
      })
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchPosts(page);
  }, [page]); // Fetch posts whenever the page changes

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

  // Delete a post with confirmation
  const deletePost = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this post?');

    if (confirmDelete) {
      const updatedPosts = posts.filter((post) => post.id !== id);
      setPosts(updatedPosts);
    }
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

      {/* Pagination Controls */}
      <div className="d-flex justify-content-between">
        <button
          className="btn btn-secondary"
          onClick={() => setPage(Math.max(1, page - 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          className="btn btn-secondary"
          onClick={() => setPage(Math.min(totalPages, page + 1))}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PostList;
