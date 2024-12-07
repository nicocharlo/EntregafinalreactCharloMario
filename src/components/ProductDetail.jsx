import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const obtenerDetallesProducto = async () => {
    try {
      const response = await fetch(`https://api.mercadolibre.com/items/${productId}`);
      const data = await response.json();
      setProduct(data);
    } catch (error) {
      console.error("Error al obtener el producto:", error);
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    obtenerDetallesProducto();
  }, [productId]);

  if (loading) return <p>Cargando detalles del producto...</p>;

  return (
    <div className="product-detail-container">
      {product ? (
        <div className="product-detail">
          <h1>{product.title}</h1>
          <img src={product.pictures[0].url} alt={product.title} className="product-image" />
          <p><strong>Precio:</strong> ${product.price}</p>
          <p><strong>Descripción:</strong> {product.description ? product.description : "No disponible."}</p>
          <a href={product.permalink} target="_blank" rel="noopener noreferrer">Ver en MercadoLibre</a>
        </div>
      ) : (
        <p>No se encontraron detalles para este producto.</p>
      )}
    </div>
  );
}

export default ProductDetail;
