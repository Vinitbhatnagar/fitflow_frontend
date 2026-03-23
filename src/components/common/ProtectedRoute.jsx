import React from 'react';

const ProtectedRoute = ({ children }) => {
  // Add authentication logic here
  return (
    <>{children}</>
  );
};

export default ProtectedRoute;
