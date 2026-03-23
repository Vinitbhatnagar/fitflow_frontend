import React from 'react';

const RoleGuard = ({ role, children }) => {
  // Add role checking logic here
  return (
    <>{children}</>
  );
};

export default RoleGuard;
