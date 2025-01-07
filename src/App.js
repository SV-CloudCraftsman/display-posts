import React from 'react';
import PostList from './components/PostList';

const App = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Real-Time React App</h1>
      <PostList />
    </div>
  );
};

export default App;
