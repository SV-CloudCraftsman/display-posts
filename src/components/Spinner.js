import React from 'react';

const Spinner = () => {
  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <div className="spinner" style={{ fontSize: '24px', color: '#888' }}>
        Loading...
      </div>
    </div>
  );
};

export default Spinner;
