import React from 'react';
import { Link } from 'react-router-dom';

export default function User({ data: { name, id }, removeUser }) {
  return (
    <div>
      <Link to={`user/${id}`}>{name}</Link>{' '}
      <button
        onClick={() => {
          removeUser(id);
        }}
      >
        Remove
      </button>
    </div>
  );
}
