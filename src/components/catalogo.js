import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Catalogo.css';

function Catalogo() {
  const { categoryId } = useParams();
  const [productos, setProductos] = useState([]);
  
  const obtenerProductos = async () => {
    try {
      const response = await fetch(`https://api.mercadolibre.com/sites/MLU/search?category=${categoryId}`);
      const data = await response.json();
      setProductos(data.results);
    } catch (error) {
      console.error('Error al obtener los productos:', error);
    }
  };

  useEffect(() => {
    if (categoryId) {
      obtenerProductos();
    }
  }, [categoryId]);

  return (
    <div className="catalogo">
      <h2>Productos en esta categoría</h2>
      <div className="productos-container">
        {productos.length > 0 ? (
          productos.map((producto) => (
            <div key={producto.id} className="producto-card">
              <img src={producto.thumbnail} alt={producto.title} className="producto-img" />
              <h3>{producto.title}</h3>
              <p>${producto.price}</p>
              <button className="agregar-carrito-btn">Agregar al carrito</button>
            </div>
          ))
        ) : (
          <p>No se encontraron productos en esta categoría.</p>
        )}
      </div>
    </div>
  );
}

export default Catalogo;
