import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function ItemDetailContainer() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
   
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`https://api.mercadolibre.com/items/${id}`);
        const data = await response.json();
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener los detalles del producto:', error);
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (!product) {
    return <p>No se encontró el producto.</p>;
  }

  return (
    <div>
      <h2>{product.title}</h2> {}
      <img src={product.thumbnail} alt={product.title} /> {}
      <p>{product.description}</p> {}
      <p>Precio: ${product.price}</p> {}
      {}
    </div>
  );
}

export default ItemDetailContainer;
