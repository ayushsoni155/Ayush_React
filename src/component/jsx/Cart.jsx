import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import '../css/Cart.css';
import Notification from './Notification';

const Cart = () => {
  const [cookies] = useCookies(['bytewiseCookies']);
  const userData = cookies.bytewiseCookies;
  const isLoggedIn = userData?.status === true;
  const [cartItems, setCartItems] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]);
  const [showLoginNotification, setShowLoginNotification] = useState(false);
  const [notification, setNotification] = useState({ message: '', type: '', visible: false });
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const totalPrice = cartItems.reduce((total, item) => total + item.Price * item.quantity, 0);

  const fetchOrderHistory = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:3000/order-history?enrollmentId=${userData.enrolmentID}`);
      const data = await response.json();
      setOrderHistory(data);
    } catch (err) {
      console.error('Order history fetch error:', err);
    }
  }, [userData]);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }

    if (isLoggedIn) {
      fetchOrderHistory();
    }
  }, [isLoggedIn, userData, fetchOrderHistory]);

  const removeItem = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return; // Prevents quantity from going below 1
    const updatedCart = cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handlePayment = async () => {
    if (!isLoggedIn) {
      setShowLoginNotification(true);
      return;
    }

    if (!window.Razorpay) {
      setNotification({ message: 'Razorpay SDK failed to load. Please check your internet connection.', type: 'error', visible: true });
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ amount: totalPrice * 100 })
      });
      const order = await response.json();

      const options = {
        key: 'rzp_test_7PpL3w409po5NZ',
        amount: order.amount,
        currency: 'INR',
        name: 'ByteWise',
        description: 'Thank you for shopping with ByteWise',
        order_id: order.id,
        method: ['upi', 'card'],
        handler: async (response) => {
          if (userData) {
            const orderDetails = {
              orderID: response.razorpay_order_id,
              enrolmentID: userData.enrolmentID,
              orderItems: cartItems.map(item => ({
                Subject_code: item.Subject_code,
                item_quantity: item.quantity,
                item_price: item.Price * item.quantity
              })),
              totalPrice: totalPrice,
              transactionID: response.razorpay_payment_id
            };
            try {
              await saveOrder(orderDetails);
              setNotification({ message: 'Payment successful!', type: 'success', visible: true });
              setPaymentSuccess(true);
            } catch (err) {
              console.error('Save order error:', err);
              setNotification({ message: 'Error saving order.', type: 'error', visible: true });
            }
          } else {
            console.log('User data not found.');
            setNotification({ message: 'User data not found.', type: 'error', visible: true });
          }
        },
        prefill: {
          name: userData?.name || 'User',
          contact: userData?.phone || '9999999999'
        },
        theme: {
          color: '#4d97e1'
        }
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error(error);
      setNotification({ message: 'Error in payment.', type: 'error', visible: true });
    }
  };

  const saveOrder = async (orderDetails) => {
    const response = await fetch('http://localhost:3000/save-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderDetails)
    });
    const data = await response.json();
    console.log('Order saved:', data);
    localStorage.removeItem('cart');
    setCartItems([]); // Clear cart after order is saved
  };

  useEffect(() => {
    if (paymentSuccess) {
      fetchOrderHistory();
      setPaymentSuccess(false); // Reset payment success state
    }
  }, [paymentSuccess, fetchOrderHistory]);

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
                <tr key={item.id} className="cart-item">
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
                    <button onClick={() => removeItem(item.id)} id="remove-button">Remove</button>
                  </td>
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
      <div className="section order-history-container">
        <h2 className="section-title">Order History</h2>
        {orderHistory.length === 0 ? (
          <p>No past orders found.</p>
        ) : (
          <ul className="order-history">
            {orderHistory.map(order => (
              <li key={order.orderID} className="order-item">
                <div>
                  <h3>Order ID: {order.orderID}</h3>
                  <p>Date: {new Date(order.order_date).toLocaleDateString()}</p>
                  <p>Total: ₹{order.total_price}</p>
                  <h4>Items:</h4>
                  <ul>
                    {order.items.map((item, index) => (
                      <li key={index}>
                        <p>Subject Code: {item.subject_code}</p>
                        <p>Quantity: {item.item_quantity}</p>
                        <p>Price: ₹{item.item_price}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {showLoginNotification && (
        <Notification
          message="Please log in to proceed with your order."
          type="warning"
          onClose={() => setShowLoginNotification(false)}
        />
      )}

      {notification.visible && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification({ ...notification, visible: false })}
        />
      )}
    </div>
  );
};

export default Cart;
