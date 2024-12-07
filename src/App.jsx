import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import ItemListContainer from './components/ItemListContainer';
import Cart from './components/Cart';
import ProductDetail from './components/ProductDetail';

function App() {
  return (
    <Router>
      <NavBar /> {}
      
      <Routes>
        {}
        <Route path="/" element={<ItemListContainer />} />
        
        {}
        <Route path="/cart" element={<Cart />} />
        
        {}
        <Route path="/product/:productId" element={<ProductDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
