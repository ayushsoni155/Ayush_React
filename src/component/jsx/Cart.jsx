import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import '../css/Cart.css';
import Notification from './Notification';
import { decryptData } from '../utils/cookieUtils'; // Import decryption utility

const Cart = () => {
  const [cookies] = useCookies(['bytewiseCookies']);
  const userData = cookies.bytewiseCookies ? decryptData(cookies.bytewiseCookies) : null; // Decrypt the cookie
  const isLoggedIn = userData?.status === true;
  const enrolmentID = userData?.enrolmentID;

  const [cartItems, setCartItems] = useState([]);
  const [pendingOrders, setPendingOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [notification, setNotification] = useState({ message: '', type: '', visible: false });

  const totalPrice = cartItems.reduce((total, item) => total + item.sellingPrice * item.quantity, 0);

  const fetchOrders = useCallback(async () => {
    if (!isLoggedIn) return;

    try {
      const response = await fetch(`https://bytewise-server.vercel.app/api/order-history?enrolmentID=${enrolmentID}`);
      const data = await response.json();
      const pending = data.filter(order => order.completeStatus === 'Pending');
      const completed = data.filter(order => order.completeStatus === 'Completed');
      setPendingOrders(pending);
      setCompletedOrders(completed);
    } catch (err) {
      console.error('Error fetching orders:', err);
    }
  }, [enrolmentID, isLoggedIn]);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
    fetchOrders();
  }, [fetchOrders]);

  const handlePayment = async () => {
    if (!isLoggedIn) {
      setNotification({ message: 'Please log in to proceed with your order.', type: 'warning', visible: true });
      return;
    }

    if (!window.Razorpay) {
      setNotification({ message: 'Razorpay SDK failed to load. Please check your internet connection.', type: 'error', visible: true });
      return;
    }

    try {
      const response = await fetch('https://bytewise-server.vercel.app/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: totalPrice * 100 }),
      });
      const order = await response.json();

      const options = {
        key: 'rzp_live_BD3KEEZCSWSCBd',
        amount: order.amount,
        currency: 'INR',
        image: 'logo-transparent-png.png',
        name: 'ByteWise',
        description: 'Thank you for shopping with ByteWise',
        order_id: order.id,
        handler: async (response) => {
          const orderDetails = {
            orderID: response.razorpay_order_id,
            enrolmentID: enrolmentID,
            orderItems: cartItems.map(item => ({
              Subject_code: item.subject_code,
              item_quantity: item.quantity,
              item_price: item.sellingPrice * item.quantity,
            })),
            totalPrice: totalPrice,
            transactionID: response.razorpay_payment_id,
          };
          try {
            await saveOrder(orderDetails);
            setNotification({ message: 'Payment successful!', type: 'success', visible: true });
          } catch (err) {
            console.error('Error saving order:', err);
            setNotification({ message: 'Error saving order.', type: 'error', visible: true });
          }
        },
        prefill: {
          name: userData?.name || 'User',
          contact: userData?.phone || '9999999999',
        },
        theme: { color: '#4d97e1' },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error(error);
      setNotification({ message: 'Error in payment.', type: 'error', visible: true });
    }
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
                <tr key={item.subject_code} className="cart-item">
                  <td>{item.product_name}</td>
                  <td>₹{item.sellingPrice}</td>
                  <td>
                    <div className="quantity-control">
                      <button onClick={() => updateQuantity(item.subject_code, item.quantity - 1)} disabled={item.quantity === 1}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.subject_code, item.quantity + 1)}>+</button>
                    </div>
                  </td>
                  <td>₹{item.sellingPrice * item.quantity}</td>
                  <td>
                    <button onClick={() => removeItem(item.subject_code)} id="remove-button">Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <div className="cart-summary">
          <h3>Total Price: ₹{totalPrice}</h3>
          <button onClick={handlePayment} className="payment-btn" disabled={cartItems.length === 0}>
            Go for payment
          </button>
        </div>
      </div>

      {/* Pending Orders */}
      <div className="section">
        <h2 className="section-title">Orders Placed (Pending)</h2>
        {pendingOrders.length === 0 ? (
          <p>No pending orders found.</p>
        ) : (
          <ul className="order-list">
            {pendingOrders.map(order => (
              <li key={order.orderID} className="order-item">
                <h3>Order ID: {order.orderID}</h3>
                <p>Date: {new Date(order.order_date).toLocaleDateString()}</p>
                <p>Time: {new Date(order.order_date).toLocaleTimeString()}</p>
                <p>Total: ₹{order.total_price}</p>
                <h4>Items:</h4>
                <ul className="order-items">
                  {order.items.map((item, index) => (
                    <li key={index}>
                      Subject Code = {item.subject_code} (x{item.item_quantity}), Price = ₹{item.item_price}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Completed Orders */}
      <div className="section">
        <h2 className="section-title">Order History (Delivered)</h2>
        {completedOrders.length === 0 ? (
          <p>No past orders found.</p>
        ) : (
          <ul className="order-list">
            {completedOrders.map(order => (
              <li key={order.orderID} className="order-item">
                <h3>Order ID: {order.orderID}</h3>
                <p>Date: {new Date(order.order_date).toLocaleDateString()}</p>
                <p>Time: {new Date(order.order_date).toLocaleTimeString()}</p>
                <p>Total: ₹{order.total_price}</p>
                <h4>Items:</h4>
                <ul className="order-items">
                  {order.items.map((item, index) => (
                    <li key={index}>
                      Subject Code = {item.subject_code} (x{item.item_quantity}), Price = ₹{item.item_price}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        )}
      </div>
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
