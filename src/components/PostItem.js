import React from 'react';

const PostItem = ({ title, body }) => {
  return (
    <div style={{ border: '1px solid #ddd', padding: '10px', margin: '10px 0' }}>
      <h3>{title}</h3>
      <p>{body}</p>
    </div>
  );
};

export default PostItem;
