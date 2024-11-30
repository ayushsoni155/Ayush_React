// import React, { useState, useEffect } from 'react';
// import '../css/BuyLabManual.css'; // Import CSS for styling
// import Filter from './Filter'; // Import the Filter component
// import Notification from './Notification'; // Import Notification component

// const BuyLabManual = () => {
//   const [labManuals, setLabManuals] = useState([]); // State to hold lab manuals from the database
//   const [searchTerm, setSearchTerm] = useState('');
//   const [semester, setSemester] = useState('All');
//   const [branch, setBranch] = useState('All');
//   const [cart, setCart] = useState(() => {
//     const storedCart = localStorage.getItem('cart');
//     return storedCart ? JSON.parse(storedCart) : []; // Parse or return an empty array
//   });
//   const [notification, setNotification] = useState({ message: '', visible: false }); // Notification state
//   const [loading, setLoading] = useState(false); // Loading state

//   // Fetch lab manuals from the database on component mount
//   useEffect(() => {
//     const fetchLabManuals = async () => {
//       setLoading(true); // Set loading to true before fetching
//       try {
//         const response = await fetch('https://bytewise-server.vercel.app/api/lab-manuals'); // API endpoint to fetch lab manuals
//         const data = await response.json();
//         setLabManuals(data);
//       } catch (error) {
//         console.error('Error fetching lab manuals:', error);
//       } finally {
//         setLoading(false); // Set loading to false once data is fetched
//       }
//     };

//     fetchLabManuals();
//   }, []);

//   // Update local storage whenever the cart changes
//   useEffect(() => {
//     localStorage.setItem('cart', JSON.stringify(cart));
//   }, [cart]);

//   // Filter logic for the lab manuals
//   const filteredManuals = labManuals.filter(manual => {
//     const normalizedSearchTerm = searchTerm.trim().toLowerCase();
//     const matchesName = manual.product_name.toLowerCase().includes(normalizedSearchTerm);
//     const matchesCode = manual.subject_code.toLowerCase().includes(normalizedSearchTerm);
//     const matchesSemester = semester === 'All' || manual.product_sem.toString() === semester.toString();
//     const matchesBranch = branch === 'All' || manual.product_branch === branch;
//     return (matchesName || matchesCode) && matchesSemester && matchesBranch;
//   });

//   // Handlers for filter changes
//   const handleSearch = (term) => {
//     setSearchTerm(term); // Update the search term directly
//   };

//   const handleSemesterChange = (e) => {
//     setSemester(e.target.value);
//   };

//   const handleBranchChange = (e) => {
//     setBranch(e.target.value);
//   };

//   // Add to cart and show notification
//   const addToCart = (manual) => {
//     setCart((prevCart) => {
//       const existingItemIndex = prevCart.findIndex(item => item.subject_code === manual.subject_code);

//       if (existingItemIndex >= 0) {
//         const updatedCart = [...prevCart];
//         updatedCart[existingItemIndex].quantity += 1;
//         return updatedCart;
//       } else {
//         return [...prevCart, { ...manual, quantity: 1 }];
//       }
//     });

//     // Show notification
//     setNotification({ message: `${manual.product_name} added to cart!`, visible: true }); // Fixed template literal
//     setTimeout(() => setNotification({ ...notification, visible: false }), 3000); // Hide after 3 seconds
//   };

//   // Notification component
//   const renderNotification = () => {
//     if (notification.visible) {
//       return <Notification message={notification.message} type="success" onClose={() => setNotification({ ...notification, visible: false })} />;
//     }
//     return null;
//   };

//   return (
//     <div className="buy-lab-manual-page">
//       {renderNotification()}
//       <Filter 
//         searchTerm={searchTerm}
//         handleSearch={handleSearch}
//         semester={semester}
//         handleSemesterChange={handleSemesterChange}
//         branch={branch}
//         handleBranchChange={handleBranchChange}
//       />
//       {loading ? (
//         <h2>Loading....</h2>
//       ) : (
//         <div className="lab-manuals-container">
//           {filteredManuals.length > 0 ? (
//             filteredManuals.map((manual) => (
//               <div className="manual-card" key={manual.subject_code}>
//                 <img src={manual.product_img} alt={manual.product_name} className="manual-image" />
//                 <div className="manual-content">
//                   <h3 className="manual-title">{manual.product_name}</h3>
//                   <p className="manual-description">{manual.product_description}</p>
//                   <p className="manual-Price"><b>Price: ₹{manual.sellingPrice}</b></p>
//                   <button onClick={() => addToCart(manual)} className="add-to-cart-button">Add to Cart</button>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <h2>No lab manuals found based on your search.</h2>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default BuyLabManual;
import React, { useState, useEffect } from 'react';
import '../css/BuyLabManual.css'; // Import CSS for styling
import Filter from './Filter'; // Import the Filter component
import Notification from './Notification'; // Import Notification component

const BuyLabManual = () => {
  const [labManuals, setLabManuals] = useState([]); // State to hold lab manuals from the database
  const [searchTerm, setSearchTerm] = useState('');
  const [semester, setSemester] = useState('All');
  const [branch, setBranch] = useState('All');
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : []; // Parse or return an empty array
  });
  const [notification, setNotification] = useState({ message: '', visible: false }); // Notification state
  const [loading, setLoading] = useState(false); // Loading state

  // Fetch lab manuals from the database on component mount
  useEffect(() => {
    const fetchLabManuals = async () => {
      setLoading(true); // Set loading to true before fetching
      try {
        const response = await fetch('https://bytewise-server.vercel.app/api/lab-manuals'); // API endpoint to fetch lab manuals
        const data = await response.json();
        setLabManuals(data);
      } catch (error) {
        console.error('Error fetching lab manuals:', error);
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };

    fetchLabManuals();
  }, []);

  // Update local storage whenever the cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Filter logic for the lab manuals
  const filteredManuals = labManuals.filter(manual => {
    const normalizedSearchTerm = searchTerm.trim().toLowerCase();
    const matchesName = manual.product_name.toLowerCase().includes(normalizedSearchTerm);
    const matchesCode = manual.subject_code.toLowerCase().includes(normalizedSearchTerm);
    const matchesSemester = semester === 'All' || manual.product_sem.toString() === semester.toString();
    const matchesBranch = branch === 'All' || manual.product_branch === branch;
    return (matchesName || matchesCode) && matchesSemester && matchesBranch;
  });

  // Handlers for filter changes
  const handleSearch = (term) => {
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

    // Show notification
    setNotification({ message: `${manual.product_name} added to cart!`, visible: true }); // Fixed template literal
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
      {loading ? (
        <h2>Loading....</h2>
      ) : (
        <div className="lab-manuals-container">
          {filteredManuals.length > 0 ? (
            filteredManuals.map((manual) => (
              <div className="manual-card" key={manual.subject_code}>
                <img src={manual.product_img} alt={manual.product_name} className="manual-image" />
                <div className="manual-content">
                  <h3 className="manual-title">{manual.product_name}</h3>
                  <p className="manual-description">{manual.product_description}</p>
                  <p className="manual-price">
                    <span className="original-price">₹{manual.pages}</span> {/* Original price (cut-off) */}
                    <b> ₹{manual.sellingPrice}</b> {/* Selling price (after offer) */}
                  </p>
                  <p className="manual-note">
                    * This price includes only a printed PDF copy. Lab files are not included.
                  </p>
                  <button onClick={() => addToCart(manual)} className="add-to-cart-button">Add to Cart</button>
                </div>
              </div>
            ))
          ) : (
            <h2>No lab manuals found based on your search.</h2>
          )}
        </div>
      )}
    </div>
  );
};

export default BuyLabManual;
