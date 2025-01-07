import React from 'react';

const PostItem = ({ id, title, body, onDelete }) => {
  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{body}</p>
        <button
          onClick={() => onDelete(id)}
          className="btn btn-danger btn-sm"
        >
          Delete Post
        </button>
      </div>
    </div>
  );
};

export default PostItem;
