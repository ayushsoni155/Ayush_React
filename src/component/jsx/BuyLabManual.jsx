import React, { useState, useEffect } from 'react';
import labManualsObj from '../../LabManualObj'; // Import the array of lab manuals
import '../css/BuyLabManual.css'; // Import CSS for styling
import { Link } from 'react-router-dom';
import Filter from './Filter'; // Import the Filter component

const BuyLabManual = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [semester, setSemester] = useState('All');
  const [branch, setBranch] = useState('All');
  
  // Initialize cart state based on local storage
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : []; // Parse or return an empty array
  });

  // Update local storage whenever the cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Filter logic for the lab manuals
  const filteredManuals = labManualsObj.filter(manual => {
    const matchesName = manual.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      manual.Subject_code.toUpperCase().includes(searchTerm.toUpperCase());
    const matchesSemester = semester === 'All' || manual.Sem === semester;
    const matchesBranch = branch === 'All' || manual.branch === branch;
    return matchesName && matchesSemester && matchesBranch;
  });

  // Handlers for filter changes
  const handleSearch = (e) => {
    setSemester('All');
    setBranch('All');
    setSearchTerm(e.target.value);
  };

  const handleSemesterChange = (e) => {
    setSemester(e.target.value);
  };

  const handleBranchChange = (e) => {
    setBranch(e.target.value);
  };

  // Add to cart, update quantity, remove from cart, clear cart logic
  const addToCart = (manual) => {
    const existingItem = cart.find(item => item.id === manual.id);
    if (existingItem) {
      setCart(cart.map(item => item.id === manual.id ? { ...item, quantity: item.quantity + 1 } : item));
    } else {
      setCart([...cart, { ...manual, quantity: 1 }]);
    }
  };

  const updateQuantity = (id, quantity) => {
    setCart(cart.map(item => item.id === id ? { ...item, quantity: Math.max(quantity, 1) } : item));
  };

  const removeFromCart = (id) => {
    const updatedCart = cart.filter(item => item.id !== id);
    setCart(updatedCart);
    if (updatedCart.length === 0) {
      localStorage.removeItem('cart');
    }
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  const totalAmount = cart.reduce((total, item) => total + (item.Price * item.quantity), 0);

  return (
    <div className="buy-lab-manual-page">
      <Filter 
        searchTerm={searchTerm}
        handleSearch={handleSearch}
        semester={semester}
        handleSemesterChange={handleSemesterChange}
        branch={branch}
        handleBranchChange={handleBranchChange}
      />

      <div className="lab-manuals-container">
        {filteredManuals.map((manual, index) => (
          <div className="manual-card" key={index}>
            <img src={manual.image} alt={manual.name} className="manual-image" />
            <div className="manual-content">
              <h3 className="manual-title">{manual.name}</h3>
              <p className="manual-description">{manual.description}</p>
              <p className="manual-Price"><b>Price: ₹{manual.Price}</b></p>
              <button onClick={() => addToCart(manual)} className="add-to-cart-button">Add to Cart</button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-section">
        <h2>Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <table className="cart-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>₹{item.Price}</td>
                  <td>
                    <div className="quantity-control">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity === 1}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                    </div>
                  </td>
                  <td>₹{item.Price * item.quantity}</td>
                  <td>
                    <button onClick={() => removeFromCart(item.id)} className="remove-button">Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <h3>Total Amount: ₹{totalAmount}</h3>
        <div className="cart-actions">
          <button className="clear-cart-button" onClick={clearCart}>Clear Cart</button>
          <Link to="/cart" className="buy-now-button">Go to Cart</Link>
        </div>
      </div>
    </div>
  );
};

export default BuyLabManual;
