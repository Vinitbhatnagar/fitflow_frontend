import React from 'react';

const MenuItem = ({ label, href }) => {
  return (
    <li>
      <a href={href}>{label}</a>
    </li>
  );
};

export default MenuItem;
