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

  // Fetch order history for the logged-in user
  const fetchOrderHistory = useCallback(async () => {
    if (!userData?.enrolmentID) return;

    try {
      const response = await fetch(`https://bytewise-server.vercel.app/api/order-history?enrolmentID=${userData.enrolmentID}`);
      const data = await response.json();

      console.log('Order History Response:', data); // Debug log to check the response data

      if (Array.isArray(data)) {
        const sortedOrders = data.sort((a, b) => new Date(b.order_date) - new Date(a.order_date));
        setOrderHistory(sortedOrders);
      } else {
        console.error('Invalid order history data', data); // Log error if data is not an array
        setOrderHistory([]);  // Reset order history in case of invalid data
      }
    } catch (err) {
      console.error('Error fetching order history:', err); // Log any error
      setOrderHistory([]); // Fallback to an empty array if there's an error
    }
  }, [userData]);

  // Fetch cart items from localStorage on initial load
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }

    if (isLoggedIn) {
      fetchOrderHistory();  // Fetch order history if logged in
    }
  }, [isLoggedIn, fetchOrderHistory]);

  // Remove item from cart
  const removeItem = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // Update item quantity in cart
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return; // Prevent going below 1
    const updatedCart = cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // Show notifications with specific messages and types
  const showNotification = (message, type) => {
    setNotification({ message, type, visible: true });
  };

  // Handle the payment process
  const handlePayment = async () => {
    if (!isLoggedIn) {
      setShowLoginNotification(true);
      return;
    }

    if (cartItems.length === 0) {
      showNotification('Your cart is empty. Please add items before proceeding.', 'warning');
      return;
    }

    if (!window.Razorpay) {
      showNotification('Razorpay SDK failed to load. Please check your internet connection.', 'error');
      return;
    }

    try {
      const response = await fetch('https://bytewise-server.vercel.app/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: totalPrice * 100 }),
      });
      const order = await response.json();

      if (!order?.id) {
        showNotification('Error in creating order. Try again.', 'error');
        return;
      }

      initiatePayment(order);  // Initiate payment with the order data
    } catch (error) {
      console.error('Payment process failed:', error);
      showNotification('Error in payment.', 'error');
    }
  };

  // Initiate Razorpay payment
  const initiatePayment = (order) => {
    const options = {
      key: 'rzp_test_7PpL3w409po5NZ',
      amount: order.amount,
      currency: 'INR',
      name: 'ByteWise',
      description: 'Thank you for shopping with ByteWise',
      order_id: order.id,
      handler: async (response) => {
        if (response.razorpay_payment_id) {
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
            await saveOrder(orderDetails);
            showNotification('Payment successful!', 'success');
            setPaymentSuccess(true);
          } catch (err) {
            console.error('Error saving order:', err);
            showNotification('Error saving order.', 'error');
          }
        } else {
          showNotification('Payment cancelled or failed.', 'error');
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
    paymentObject.open();
  };

  // Save the order details after successful payment
  const saveOrder = async (orderDetails) => {
    try {
      const response = await fetch('https://bytewise-server.vercel.app/api/save-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderDetails),
      });

      const data = await response.json();
      if (data.message === 'Order saved successfully') {
        localStorage.removeItem('cart');
        setCartItems([]);  // Clear cart after successful order
      }
    } catch (err) {
      console.error('Error saving order:', err);
      showNotification('Error saving order.', 'error');
    }
  };

  // Fetch order history after successful payment
  useEffect(() => {
    if (paymentSuccess) {
      fetchOrderHistory();
      setPaymentSuccess(false);
    }
  }, [paymentSuccess, fetchOrderHistory]);

  // Format the order date and time
  const formatDateTime = (dateStr) => {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}-${month}-${year} ${hours}:${minutes}`;
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
          <button onClick={handlePayment} className="payment-btn" disabled={cartItems.length === 0}>Go for payment</button>
        </div>
      </div>

      {/* Order History Section */}
      {isLoggedIn && orderHistory.length > 0 ? (
        <div className="section">
          <h2 className="section-title">Order History</h2>
          <table className="order-history-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orderHistory.map(order => (
                <tr key={order._id}>
                  <td>{order.order_id}</td>
                  <td>{formatDateTime(order.order_date)}</td>
                  <td>₹{order.totalPrice}</td>
                  <td>{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        isLoggedIn && <p>No previous orders found.</p>
      )}

      {/* Notification */}
      {notification.visible && (
        <Notification message={notification.message} type={notification.type} />
      )}
    </div>
  );
};

export default Cart;
