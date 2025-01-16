import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import CryptoJS from 'crypto-js';
import '../css/Cart.css';
import Notification from './Notification';
import PaymentDropdown from './PaymentDropdown';
import OrderHistory from './OrderHistory';
import '../css/OrderHistory.css';

const secretKey = process.env.REACT_APP_SECRET_KEY; // Secret key for decryption

const Cart = () => {
  const [cookies] = useCookies(['bytewiseCookies']);

  const decryptCookie = (cookieValue) => {
    if (!cookieValue) return null;
    try {
      const bytes = CryptoJS.AES.decrypt(cookieValue, secretKey);
      const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
      return decryptedData ? JSON.parse(decryptedData) : null;
    } catch (error) {
      console.error('Error decrypting cookie:', error);
      return null;
    }
  };

  const encryptData = (data) => {
    try {
      return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
    } catch (error) {
      console.error('Error encrypting data:', error);
      return null;
    }
  };

  const userData = cookies.bytewiseCookies ? decryptCookie(cookies.bytewiseCookies) : null;

  const isLoggedIn = userData?.status === true;
  const enrolmentID = userData?.enrolmentID || '';
  const [cartItems, setCartItems] = useState([]);
  const [pendingOrders, setPendingOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [notification, setNotification] = useState({ message: '', type: '', visible: false });
  const [loading, setLoading] = useState(false);
  const [loadingPay, setLoadingPay] = useState(false);

  const totalPrice = cartItems.reduce((total, item) => total + item.sellingPrice * item.quantity, 0);
  const tempSaveing = cartItems.reduce((totalS, itemS) => totalS + itemS.marketPrice * itemS.quantity, 0);
  const totalSaveing= tempSaveing-totalPrice;

  const fetchOrders = useCallback(async () => {
    if (!isLoggedIn) return;
    setLoading(true);
    try {
      const response = await fetch(`https://bytewise-server.vercel.app/api/order-history?enrolmentID=${enrolmentID}`);
      const data = await response.json();

      const pending = data.filter(order => order.completeStatus === 'Pending');
      const completed = data.filter(order => order.completeStatus === 'Completed');
      setPendingOrders(pending);
      setCompletedOrders(completed);
    } catch (err) {
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  }, [enrolmentID, isLoggedIn]);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      const decryptedCart = decryptCookie(storedCart);
      setCartItems(decryptedCart || []);
    }

    fetchOrders();
  }, [fetchOrders]);

  const removeItem = (subject_code) => {
    const updatedCart = cartItems.filter(item => item.subject_code !== subject_code);
    setCartItems(updatedCart);
    localStorage.setItem('cart', encryptData(updatedCart));
  };

  const updateQuantity = (subject_code, newQuantity) => {
    if (newQuantity < 1) return;
    const updatedCart = cartItems.map(item =>
      item.subject_code === subject_code ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem('cart', encryptData(updatedCart));
  };
 const handlePaymentOffline = async () => {
  if (!isLoggedIn) {
    setNotification({
      message: 'Please log in to proceed with your order.',
      type: 'warning',
      visible: true,
    });
    return;
  }

  setLoadingPay(true);

  // Function to generate a transaction ID
  const generateTransactionId = () => {
    const prefix = "pay_";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const length = 15;
    let randomPart = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomPart += characters[randomIndex];
    }

    return prefix + randomPart;
  };

  // Create the order details object
  const orderDetails = {
    orderID: generateTransactionId(), // Offline payment doesn't need Razorpay order ID
    enrolmentID,
    orderItems: cartItems.map((item) => ({
      subject_code: item.subject_code,
      item_quantity: item.quantity,
      item_price: item.sellingPrice * item.quantity,
    })),
    totalPrice,
    payment_Method: 'Offline',
    paymentStatus: 'Not_Done',
    transactionID: generateTransactionId(),
  };

  // Save the order
  try {
    await saveOrder(orderDetails);
    setNotification({
      message: 'Order placed successfully!',
      type: 'success',
      visible: true,
    });
  } catch (error) {
    setNotification({
      message: 'Error placing the order. Please try again.',
      type: 'error',
      visible: true,
    });
  } finally {
    setLoadingPay(false);
  }
};
 
  const handlePaymentOnline = async () => {
    if (!isLoggedIn) {
      setNotification({ message: 'Please log in to proceed with your order.', type: 'warning', visible: true });
      return;
    }

    if (!window.Razorpay) {
      setNotification({ message: 'Razorpay SDK failed to load. Please check your internet connection.', type: 'error', visible: true });
      return;
    }

    setLoadingPay(true);
    try {
      const response = await fetch('https://bytewise-server.vercel.app/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: totalPrice * 100 }),
      });
      const order = await response.json();

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY,
        amount: order.amount,
        currency: 'INR',
        image: 'logo-transparent-png.png',
        name: 'ByteWise',
        description: 'Thank you for shopping with ByteWise',
        order_id: order.id,
        handler: async (response) => {
          const orderDetails = {
            orderID: response.razorpay_order_id,
            enrolmentID,
            orderItems: cartItems.map(item => ({
              subject_code: item.subject_code,
              item_quantity: item.quantity,
              item_price: item.sellingPrice * item.quantity,
            })),
            totalPrice,
            payment_Method:'Online',
            paymentStatus:'Done',
            transactionID: response.razorpay_payment_id,
          };
          await saveOrder(orderDetails);
          setNotification({ message: 'Payment successful!', type: 'success', visible: true });
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
    } finally {
      setLoadingPay(false);
    }
  };

  const saveOrder = async (orderDetails) => {
    setLoading(true);
    try {
      const response = await fetch('https://bytewise-server.vercel.app/api/save-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderDetails),
      });
      const data = await response.json();
      console.log('Order saved:', data);
      localStorage.removeItem('cart');
      setCartItems([]);
      fetchOrders();
    } catch (error) {
      console.error('Error saving order:', error);
    }
    setLoading(false);
  };

  return (
    <div className="cart-container">  
  {/* Cart Section */}  
  <div id='sectionID1' className="section">  
    <h2 className="section-title">Your Cart</h2>  
    {cartItems.length === 0 ? (  
      <p>Your cart is empty. <Link to="/Lab-Manuals">Go back to shopping.</Link></p>  
    ) : (  
      <div className="cart-items">  
        {cartItems.map(item =>{
          const discountPercentage = Math.round(((item.marketPrice - item.sellingPrice) / item.marketPrice) * 100);
          return(
          <div key={item.subject_code} className="cart-item-card">  
            <img src={item.product_img} alt={item.product_name} className="product-image" />  
            <div className="product-info">  
              <h2 className="product-name">{item.product_name}</h2> 
              <p className="product-price">Price: <span id='cp'>₹{item.marketPrice}</span> <span>₹{item.sellingPrice}</span><span id='offerP'>{discountPercentage}% Off</span></p> 
              <div className="quantity-control"> 
              <p><b>Quantity:</b></p>
              <div className='qntBtn'>
                <button onClick={() => updateQuantity(item.subject_code, item.quantity - 1)} disabled={item.quantity === 1} className="quantity-btn">  
                 <b>-</b> </button>  
                <span className="quantity"><b>{item.quantity}</b></span>  
                <button onClick={() => updateQuantity(item.subject_code, item.quantity + 1)} className="quantity-btn">  
                 <b>+</b>                </button>  
                 </div>
              </div>  
            </div>  
            <div className="removeDiv">
            <p className="product-total"><b>Total: ₹{item.sellingPrice * item.quantity}</b></p>  
            <button onClick={() => removeItem(item.subject_code)} className="remove-btn">  
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%" height="20"><path fill="currentColor" d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1M18 9H6v10c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V9z"/></svg>  
            </button>  
              </div>
          </div> 
        )
      }
    )
    }  
      </div>  
    )}  
    <div className="cart-summary">  
      <h3>Total Price: ₹{totalPrice}</h3>
      
      {loadingPay ? (  
        <div className="Loginloading"></div>  
      ) : (  
       <PaymentDropdown
  handleOnlinePayment={handlePaymentOnline}
  handleCashOnDelivery={handlePaymentOffline}
  cartItems={cartItems}
/>

      )}  
    </div>  
     <p className="pSaving">You saved ₹{totalSaveing}</p>
  </div>  

      {/* Pending Orders */}
      <div className="section">
        <h2 className="section-title">Orders Placed (Pending)</h2>
        {loading ? (
          <div className="skeleton-container">
           {Array.from({ length: 3 }).map((_, index) => (
             <div key={index} className="skeleton-card">
               <div className="skeleton-title skeleton-text"></div>
               <div className="skeleton-text"></div>
               <div className="skeleton-text"></div>
               <div className="skeleton-subtitle skeleton-text"></div>
               <ul className="skeleton-items">
                 {Array.from({ length: 2 }).map((_, i) => (
                   <li key={i} className="skeleton-text"></li>
                 ))}
               </ul>
             </div>
           ))}
         </div>
        ) : pendingOrders.length === 0 ? (
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
                      {item.product_name} {item.subject_code} (x{item.item_quantity}), Price = ₹{item.item_price}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        )}
      </div>
      <OrderHistory completedOrders={completedOrders} loading={loading} />

      {/* Notification Component */}
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
