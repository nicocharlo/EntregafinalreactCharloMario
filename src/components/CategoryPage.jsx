// CategoryPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function CategoryPage() {
  const { categoryId } = useParams(); // Obtener el categoryId desde la URL
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const obtenerProductosPorCategoria = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://api.mercadolibre.com/sites/MLU/search?category=${categoryId}`);
        const data = await response.json();
        setProductos(data.results);
      } catch (error) {
        console.error("Error al obtener productos de la categoría:", error);
      } finally {
        setLoading(false);
      }
    };

    obtenerProductosPorCategoria();
  }, [categoryId]);

  if (loading) return <p>Cargando productos...</p>;

  return (
    <div>
      <h1>Productos de la Categoría</h1>
      <div className="productos-grid">
        {productos.length > 0 ? (
          productos.map((producto) => (
            <div key={producto.id} className="producto-card">
              <img src={producto.thumbnail} alt={producto.title} className="producto-imagen" />
              <div className="producto-detalle">
                <h2 className="producto-titulo">{producto.title}</h2>
                <p className="producto-precio">Precio: ${producto.price}</p>
                <a href={producto.permalink} target="_blank" rel="noopener noreferrer" className="producto-enlace">
                  Ver en MercadoLibre
                </a>
              </div>
            </div>
          ))
        ) : (
          <p>No se encontraron productos para esta categoría.</p>
        )}
      </div>
    </div>
  );
}

export default CategoryPage;
