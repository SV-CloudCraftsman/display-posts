import React, { useEffect, useState } from 'react';
import PostItem from './PostItem';
import Spinner from './Spinner';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from JSONPlaceholder API using fetch
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setPosts(data); // Limit to 10 posts
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <h2>Posts</h2>
      {posts.map((post) => (
        <PostItem key={post.id} title={post.title} body={post.body} />
      ))}
    </div>
  );
};

export default PostList;
