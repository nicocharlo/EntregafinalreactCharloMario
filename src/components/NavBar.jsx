import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
import { CartContext } from '../context/CartContext';

function NavBar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const { calcularCantidadTotal } = useContext(CartContext);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const obtenerCategorias = async () => {
    try {
      const response = await fetch('https://api.mercadolibre.com/sites/MLU/categories');
      const data = await response.json();
      setCategorias(data);
    } catch (error) {
      console.error('Error al obtener las categorías:', error);
    }
  };

  useEffect(() => {
    obtenerCategorias();
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-logo">
          MiPrecios
        </Link>
        <Link to="/cart" className="navbar-item cart-link">
          Carrito 
          {/* Contador del carrito en superíndice */}
          {calcularCantidadTotal() > 0 && (
            <span className="cart-counter">{calcularCantidadTotal()}</span>
          )}
        </Link>
      </div>

      <div className="navbar-right">
        <div className="categorias-container">
          <button onClick={toggleDropdown} className="navbar-item categoria-boton">
            Categorías
            <span className={`categoria-icono ${dropdownOpen ? 'abierto' : ''}`}>▼</span>
          </button>
          {dropdownOpen && (
            <div className="categorias-dropdown">
              {categorias.map((categoria) => (
                <Link
                  key={categoria.id}
                  to={`/category/${categoria.id}`}
                  className="navbar-item categoria-enlace"
                >
                  {categoria.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
