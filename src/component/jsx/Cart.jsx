import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/Cart.css'; // Import your CSS for styling

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  // Fetch cart items from localStorage on component mount
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  // Function to remove an item from the cart
  const removeItem = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    // Update localStorage
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => total + item.Price * item.quantity, 0);

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty. <Link to="/Lab-Manuals">Go back to shopping.</Link></p>
      ) : (
        <>
          <ul className="cart-items">
            {cartItems.map(item => (
              <li key={item.id} className="cart-item">
                <div>
                  <h3>{item.name}</h3>
                  <p>Price: ₹{item.Price * item.quantity}</p>
                </div>
                <button onClick={() => removeItem(item.id)} id="remove-button">Remove</button>
              </li>
            ))}
          </ul>
          <div className="cart-summary">
            <h3>Total Price: ₹{totalPrice}</h3>
            <Link to="/payment" className="payment-btn">Go for payment</Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
