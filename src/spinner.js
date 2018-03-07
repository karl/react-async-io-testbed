import React from 'react';

export const Spinner = ({ size }) => {
  const fontSize = size === 'large' ? 28 : 14;
  return (
    <div className="Spinner" style={{ fontSize }}>
      {'🌀'}
    </div>
  );
};
