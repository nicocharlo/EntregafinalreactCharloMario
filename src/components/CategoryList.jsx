import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function CategoryList() {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const obtenerCategorias = async () => {
      try {
        const response = await fetch('https://api.mercadolibre.com/sites/MLU/categories');
        const data = await response.json();
        setCategorias(data);
      } catch (error) {
        console.error('Error al obtener categorías:', error);
      }
    };

    obtenerCategorias();
  }, []);

  return (
    <div>
      <h1>Categorías</h1>
      <ul>
        {categorias.map((categoria) => (
          <li key={categoria.id}>
            <Link to={`/category/${categoria.id}`}>{categoria.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoryList;
