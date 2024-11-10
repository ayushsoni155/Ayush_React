// Cart.js (Frontend for displaying cart and order history)
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import '../css/Cart.css';
import Notification from './Notification';

const Cart = () => {
  const [cookies] = useCookies(['bytewiseCookies']);
  const userData = cookies.bytewiseCookies; // Retrieve user data from cookies
  const isLoggedIn = userData?.status === true; // Check login status
  const [cartItems, setCartItems] = useState([]); // Cart items state
  const [orderHistory, setOrderHistory] = useState([]); // Order history state
  const [notification, setNotification] = useState({ message: '', type: '', visible: false });
  const totalPrice = cartItems.reduce((total, item) => total + item.Price * item.quantity, 0);

  // Fetch order history from the backend
  const fetchOrderHistory = async (enrolmentID) => {
    try {
      const response = await fetch(`https://bytewise-server.vercel.app/api/order-history?enrolmentID=${enrolmentID}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch order history');
      }

      const data = await response.json();
      setOrderHistory(data);
    } catch (error) {
      console.error('Error fetching order history:', error);
      setNotification({ message: 'Error fetching order history', type: 'error', visible: true });
    }
  };

  // Fetch cart and order history on mount
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }

    if (isLoggedIn && userData?.enrolmentID) {
      fetchOrderHistory(userData.enrolmentID); // Fetch order history if logged in
    }
  }, [isLoggedIn, userData]);

  // Remove item from cart
  const removeItem = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // Update item quantity in cart
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return; // Prevent quantity from going below 1
    const updatedCart = cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // Handle Razorpay payment
  const handlePayment = async () => {
    if (!isLoggedIn) {
      setNotification({ message: 'Please log in to proceed with payment.', type: 'warning', visible: true });
      return;
    }

    try {
      const response = await fetch('https://bytewise-server.vercel.app/api/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: totalPrice * 100 }),  // Send total amount (converted to paise)
      });
      const order = await response.json();

      // Razorpay payment options
      const options = {
        key: 'rzp_test_7PpL3w409po5NZ',  // Your Razorpay API key
        amount: order.amount,
        currency: 'INR',
        name: 'ByteWise',
        description: 'Thank you for shopping with ByteWise',
        order_id: order.id,
        handler: async (response) => {
          const orderDetails = {
            orderID: response.razorpay_order_id,
            enrolmentID: userData.enrolmentID,
            orderItems: cartItems.map(item => ({
              Subject_code: item.Subject_code,
              item_quantity: item.quantity,
              item_price: item.Price * item.quantity,
            })),
            totalPrice: totalPrice,
            transactionID: response.razorpay_payment_id,
          };

          try {
            await saveOrder(orderDetails);  // Save order to the server
            setNotification({ message: 'Payment successful!', type: 'success', visible: true });

            // Clear cart and fetch updated order history
            localStorage.removeItem('cart');
            setCartItems([]);
            fetchOrderHistory(userData.enrolmentID);  // Re-fetch order history after payment
          } catch (error) {
            setNotification({ message: 'Error saving order', type: 'error', visible: true });
          }
        },
        prefill: {
          name: userData?.name || 'User',
          contact: userData?.phone || '9999999999',
        },
        theme: {
          color: '#4d97e1',
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();  // Open Razorpay payment modal
    } catch (error) {
      console.error('Error during payment:', error);
      setNotification({ message: 'Payment failed. Please try again.', type: 'error', visible: true });
    }
  };

  // Save order to the server
  const saveOrder = async (orderDetails) => {
    const response = await fetch('https://bytewise-server.vercel.app/api/save-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderDetails),
    });
    const data = await response.json();
    localStorage.removeItem('cart');
    setCartItems([]);  // Clear cart after order is saved
  };

  return (
    <div className="cart-container">
      {/* Cart Section */}
      <div className="section">
        <h2 className="section-title">Your Cart</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty. <Link to="/Lab-Manuals">Go back to shopping.</Link></p>
        ) : (
          <table className="cart-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map(item => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>₹{item.Price}</td>
                  <td>
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity === 1}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  </td>
                  <td>₹{item.Price * item.quantity}</td>
                  <td><button onClick={() => removeItem(item.id)}>Remove</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <div className="cart-summary">
          <h3>Total Price: ₹{totalPrice}</h3>
          <button onClick={handlePayment} className="payment-btn">Go for payment</button>
        </div>
      </div>

      {/* Order History Section */}
      <div className="section">
        <h2 className="section-title">Order History</h2>
        {orderHistory.length === 0 ? (
          <p>No past orders found.</p>
        ) : (
          <ul>
            {orderHistory.map(order => (
              <li key={order.orderID} className="order-item">
                <p><strong>Order ID:</strong> {order.orderID}</p>
                <p><strong>Date:</strong> {new Date(order.order_date).toLocaleDateString() || 'Date not available'}</p>
                <p><strong>Total:</strong> ₹{order.total_price}</p>
                <h4>Order Items:</h4>
                <ul>
                  {order.items.map(item => (
                    <li key={item.order_itemsID}>
                      <p><strong>Subject Code:</strong> {item.subject_code}</p>
                      <p><strong>Quantity:</strong> {item.item_quantity}</p>
                      <p><strong>Price:</strong> ₹{item.item_price}</p>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Cart;
