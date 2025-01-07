import React from 'react';

const PostItem = ({ id, title, body, onDelete }) => {
  return (
    <div style={postItemStyle}>
      <h3>{title}</h3>
      <p>{body}</p>
      <button
        onClick={() => onDelete(id)}
        style={{ ...buttonStyle, backgroundColor: '#DC3545' }}
      >
        Delete Post
      </button>
    </div>
  );
};

// Styles
const postItemStyle = {
  border: '1px solid #ddd',
  padding: '10px',
  margin: '10px 0',
  borderRadius: '5px',
};

const buttonStyle = {
  marginTop: '10px',
  padding: '5px 10px',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

export default PostItem;
