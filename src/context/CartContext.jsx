import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [carrito, setCarrito] = useState(() => {
    const carritoGuardado = localStorage.getItem('carrito');
    return carritoGuardado ? JSON.parse(carritoGuardado) : [];
  });

  // Guardar el carrito en localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]);

  const añadirAlCarrito = (producto) => {
    const nuevoCarrito = [...carrito];
    const index = nuevoCarrito.findIndex(item => item.id === producto.id);

    if (index !== -1) {
      nuevoCarrito[index].quantity += 1;
    } else {
      nuevoCarrito.push({ ...producto, quantity: 1 });
    }

    setCarrito(nuevoCarrito);
  };

  const eliminarDelCarrito = (productoId) => {
    const nuevoCarrito = carrito.filter((item) => item.id !== productoId);
    setCarrito(nuevoCarrito);
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  const pagarCarrito = () => {
    setCarrito([]);
    alert("Pago realizado con éxito. El carrito ha sido vaciado.");
  };

  // Función para calcular la cantidad total de productos en el carrito
  const calcularCantidadTotal = () => {
    return carrito.reduce((total, producto) => total + producto.quantity, 0);
  };

  return (
    <CartContext.Provider value={{ 
      carrito, 
      añadirAlCarrito, 
      eliminarDelCarrito, 
      vaciarCarrito, 
      pagarCarrito, 
      calcularCantidadTotal 
    }}>
      {children}
    </CartContext.Provider>
  );
};
