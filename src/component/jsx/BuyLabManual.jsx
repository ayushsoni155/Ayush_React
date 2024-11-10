import React, { useState, useEffect } from 'react';
import labManualsObj from '../../LabManualObj'; // Import the array of lab manuals
import '../css/BuyLabManual.css'; // Import CSS for styling
import Filter from './Filter'; // Import the Filter component
import Notification from './Notification'; // Import Notification component

const BuyLabManual = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [semester, setSemester] = useState('All');
  const [branch, setBranch] = useState('All');
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : []; // Parse or return an empty array
  });
  const [notification, setNotification] = useState({ message: '', visible: false }); // Notification state

  // Update local storage whenever the cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Filter logic for the lab manuals
  const filteredManuals = labManualsObj.filter(manual => {
    // Normalize the search term by removing spaces and converting it to uppercase
    const normalizedSearchTerm = searchTerm.replace(/\s+/g, '').toUpperCase();
    const matchesName = manual.name.toLowerCase().includes(normalizedSearchTerm.toLowerCase()) || 
      manual.Subject_code.replace(/\s+/g, '').toUpperCase().includes(normalizedSearchTerm);
    const matchesSemester = semester === 'All' || manual.Sem === semester;
    const matchesBranch = branch === 'All' || manual.branch === branch;
    return matchesName && matchesSemester && matchesBranch;
  });

  // Handlers for filter changes
  const handleSearch = (term) => {
    setSemester('All');
    setBranch('All');
    setSearchTerm(term); // Update the search term directly
  };

  const handleSemesterChange = (e) => {
    setSemester(e.target.value);
  };

  const handleBranchChange = (e) => {
    setBranch(e.target.value);
  };

  // Add to cart and show notification
  const addToCart = (manual) => {
    const existingItem = cart.find(item => item.id === manual.id);
    if (existingItem) {
      setCart(cart.map(item => item.id === manual.id ? { ...item, quantity: item.quantity + 1 } : item));
    } else {
      setCart([...cart, { ...manual, quantity: 1 }]);
    }
    // Show notification
    setNotification({ message: `${manual.name} added to cart!`, visible: true });
    setTimeout(() => setNotification({ ...notification, visible: false }), 3000); // Hide after 3 seconds
  };

  // Notification component
  const renderNotification = () => {
    if (notification.visible) {
      return <Notification message={notification.message} type="success" onClose={() => setNotification({ ...notification, visible: false })} />;
    }
    return null;
  };

  return (
    <div className="buy-lab-manual-page">
      {renderNotification()}

      <Filter 
        searchTerm={searchTerm}
        handleSearch={handleSearch}
        semester={semester}
        handleSemesterChange={handleSemesterChange}
        branch={branch}
        handleBranchChange={handleBranchChange}
      />

      <div className="lab-manuals-container">
        {filteredManuals.length > 0 ? (
          filteredManuals.map((manual, index) => (
            <div className="manual-card" key={index}>
              <img src={manual.image} alt={manual.name} className="manual-image" />
              <div className="manual-content">
                <h3 className="manual-title">{manual.name}</h3>
                <p className="manual-description">{manual.description}</p>
                <p className="manual-Price"><b>Price: ₹{manual.Price}</b></p>
                <button onClick={() => addToCart(manual)} className="add-to-cart-button">Add to Cart</button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-manuals">No lab manuals found based on your filter.</p>
        )}
      </div>
    </div>
  );
};

export default BuyLabManual;
