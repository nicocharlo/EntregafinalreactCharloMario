import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import './Cart.css';

function Cart() {
  const { carrito, eliminarDelCarrito, pagarCarrito } = useContext(CartContext);

  if (carrito.length === 0) {
    return <h2>El carrito está vacío.</h2>;
  }

  const calcularTotal = () => {
    return carrito.reduce((total, producto) => {
      const precio = parseFloat(producto.price);
      if (!isNaN(precio)) {
        return total + precio * producto.quantity;
      }
      return total;
    }, 0);
  };

  return (
    <div className="cart-container">
      <h1>Carrito de Compras</h1>
      <ul className="cart-items">
        {carrito.map((producto, index) => (
          <li key={index} className="cart-item">
            <img src={producto.thumbnail} alt={producto.title} className="cart-item-image" />
            <div className="cart-item-details">
              <p className="cart-item-title">{producto.title}</p>
              <p className="cart-item-price">Precio: ${producto.price}</p>
              <p className="cart-item-quantity">Cantidad: {producto.quantity}</p> {}
              <button onClick={() => eliminarDelCarrito(producto.id)} className="cart-item-remove">
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
      <p className="cart-total">Total: ${calcularTotal().toFixed(2)}</p> {}
      <button onClick={pagarCarrito} className="cart-checkout">
        Pagar
      </button>
    </div>
  );
}

export default Cart;
