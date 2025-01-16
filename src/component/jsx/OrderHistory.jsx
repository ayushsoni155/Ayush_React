import React, { useState } from "react";
import '../css/OrderHistory.css';

const OrderHistory = ({ completedOrders, loading }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="order-history">
      {/* Dropdown Toggle */}
      <div className="historyTab" onClick={toggleDropdown}>
        Order History {isDropdownOpen ? "▲" : "▼"}
      </div>

      {/* Dropdown Content */}
      {isDropdownOpen && (
        <div className="section">
          <h2 className="section-title">Orders History</h2>
          {loading ? (
            <div className="skeletonOP-container">
           {Array.from({ length: 3 }).map((_, index) => (
             <div key={index} className="skeletonOP-card">
               <div className="skeletonOP-title skeletonOP-text"></div>
               <div className="skeletonOP-text"></div>
               <div className="skeletonOP-text"></div>
               <div className="skeletonOP-subtitle skeletonOP-text"></div>
               <ul className="skeletonOP-items">
                 {Array.from({ length: 2 }).map((_, i) => (
                   <li key={i} className="skeletonOP-text"></li>
                 ))}
               </ul>
             </div>
           ))}
         </div>
          ) : completedOrders.length === 0 ? (
            <p>No completed orders found.</p>
          ) : (
            <ul className="order-list">
              {completedOrders.map((order) => (
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
      )}
    </div>
  );
};

export default OrderHistory;
