import React, { useEffect, useState } from 'react';
import PostItem from './PostItem';
import Spinner from './Spinner';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

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
      <button onClick={fetchPosts} style={buttonStyle}>
        Refresh Posts
      </button>
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

// Button style
const buttonStyle = {
  margin: '10px 0',
  padding: '10px 20px',
  backgroundColor: '#007BFF',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

export default PostList;
