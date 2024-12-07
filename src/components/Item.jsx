import React from 'react';
import { Link } from 'react-router-dom';

function Item({ id, name }) {
  return (
    <div>
      <h2>{name}</h2>
      <Link to={`/item/${id}`}>Ver Detalles</Link> {}
    </div>
  );
}

export default Item;
