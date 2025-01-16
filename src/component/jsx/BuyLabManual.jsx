import React, { useState, useEffect } from 'react';
import '../css/BuyLabManual.css'; // Import CSS for styling
import Filter from './Filter'; // Import the Filter component
import Notification from './Notification'; // Import Notification component
import CryptoJS from 'crypto-js'; // Import CryptoJS for encryption and decryption
import MaintenancePage from './MaintenancePage'; // Import the MaintenancePage component

const secretKey = process.env.REACT_APP_SECRET_KEY; // Secret key for decryption

const encryptData = (data) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
};

const decryptData = (encryptedData) => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
  const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
  return decryptedData ? JSON.parse(decryptedData) : [];
};

const BuyLabManual = () => {
  const [labManuals, setLabManuals] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [semester, setSemester] = useState('All');
  const [branch, setBranch] = useState('All');
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? decryptData(storedCart) : [];
  });
  const [notification, setNotification] = useState({ message: '', visible: false });
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    const fetchLabManuals = async () => {
      setLoading(true);
      setFetchError(false);
      try {
        const response = await fetch('https://bytewise-server.vercel.app/api/lab-manuals');
        if (!response.ok) throw new Error('Failed to fetch lab manuals');
        const data = await response.json();
        setLabManuals(data);
      } catch (error) {
        console.error('Error fetching lab manuals:', error);
        setFetchError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchLabManuals();
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', encryptData(cart));
  }, [cart]);

  const filteredManuals = labManuals.filter(manual => {
    const normalizedSearchTerm = searchTerm.trim().toLowerCase();
    const matchesName = manual.product_name.toLowerCase().includes(normalizedSearchTerm);
    const matchesCode = manual.subject_code.toLowerCase().includes(normalizedSearchTerm);
    const matchesSemester = semester === 'All' || manual.product_sem.toString() === semester.toString();
    const matchesBranch = branch === 'All' || manual.product_branch === branch;
    return (matchesName || matchesCode) && matchesSemester && matchesBranch;
  });

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleSemesterChange = (e) => {
    setSemester(e.target.value);
  };

  const handleBranchChange = (e) => {
    setBranch(e.target.value);
  };

  const addToCart = (manual) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(item => item.subject_code === manual.subject_code);
      if (existingItemIndex >= 0) {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += 1;
        return updatedCart;
      } else {
        return [...prevCart, { ...manual, quantity: 1 }];
      }
    });

    setNotification({ message: `${manual.product_name} added to cart!`, visible: true });
    setTimeout(() => setNotification({ ...notification, visible: false }), 3000);
  };

  const renderNotification = () => {
    if (notification.visible) {
      return <Notification message={notification.message} type="success" onClose={() => setNotification({ ...notification, visible: false })} />;
    }
    return null;
  };

  if (fetchError) {
    return <MaintenancePage />;
  }

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
      {loading ? (
        <div className="skeletonBM-container">
          {[...Array(12)].map((_, index) => (
            <div className="skeletonBM-card" key={index}>
              <div className="skeletonBM-image"></div>
              <div className="skeletonBM-text skeletonBM-title"></div>
              <div className="skeletonBM-text skeletonBM-description"></div>
              <div className="skeletonBM-text skeletonBM-price"></div>
              <div className="skeletonBM-button"></div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="lab-manuals-container">
            {filteredManuals.length > 0 ? (
              filteredManuals.map((manual) => {
                const discountPercentage = Math.round(((manual.marketPrice - manual.sellingPrice) / manual.marketPrice) * 100);
                return (
                  <div className="manual-card" key={manual.subject_code}>
                    <img src={manual.product_img} alt={manual.product_name} className="manual-image" />
                    <div className="manual-content">
                      <h3 className="manual-title">{manual.product_name}</h3>
                      <p className="manual-description">{manual.product_description}</p>
                      <p className="manual-price">
                        <span className="original-price">₹{manual.marketPrice}</span>
                        <b> ₹{manual.sellingPrice}</b> <p className="manual-discount">{discountPercentage}% Off</p>
                      </p>
                      <button onClick={() => addToCart(manual)} className="add-to-cart-button">Add to Cart</button>
                    </div>
                  </div>
                );
              })
            ) : (
              <h2>No lab manuals found based on your search.</h2>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default BuyLabManual;
