// import React, { useState } from "react";
// import "../css/Header.css"; // Importing the CSS file
// import { FaBars } from "react-icons/fa"; // Importing the Font Awesome icon
// import { Link } from "react-router-dom";
// import { CiShoppingCart } from "react-icons/ci";
// import { useCookies } from 'react-cookie'; // Import useCookies

// const Header = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [cookies] = useCookies(['bytewiseCookies']); // Use cookies to check login status

//   // Toggle the navigation menu for mobile
//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   // Scroll to the top when navigating
//   const scrollToTop = () => {
//     window.scrollTo(0, 0);  // Scrolls to the top of the page
//   }

//   // Check login status based on cookies
//   const isLoggedIn = cookies.bytewiseCookies && cookies.bytewiseCookies.status === true;

//   // Close the menu when a navigation link is clicked
//   const handleLinkClick = () => {
//     setIsMenuOpen(false);
//     scrollToTop();
//   };

//   return (
//     <header>
//       <div className="container">
//         <div className="logo">
//           <h1>ByteWise</h1>
//           <p id="tagline">Your toolkit for engineering success</p>
//         </div>
        
//         {/* Navigation Bar */}
//         <nav className={isMenuOpen ? "nav-active" : ""}>
//           <ul className="nav-Links">
//             <li><Link to="/" onClick={handleLinkClick}>Home</Link></li>
//             <li><Link to="/notes" onClick={handleLinkClick}>Notes</Link></li>
//             <li><Link to="/Lab-Manuals" onClick={handleLinkClick}>Lab Manuals</Link></li>
//             <li><Link to="/courses" onClick={handleLinkClick}>Courses</Link></li>
//           </ul>
          
//           {/* Conditional rendering for Login/Profile button */}
//           {isLoggedIn ? (
//             <button className="profile-btn">
//               <Link to='/profile'>
//                 <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
//                   <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
//                   <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
//                 </svg>
//               </Link>
//             </button>
//           ) : (
//             <button id="LoginBtn">
//               <Link to='/login'>Login</Link>
//             </button>
//           )}

//           {/* Cart Button */}
//           <button className="cartprofile">
//             <Link to='/cart' onClick={scrollToTop}><CiShoppingCart /></Link>
//           </button>
//         </nav>
        
//         {/* Menu Icon for Mobile View */}
//         <div className="menu-icon" onClick={toggleMenu}>
//           <FaBars />
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;
import React, { useState } from "react";
import "../css/Header.css"; // Importing the CSS file
import { FaBars } from "react-icons/fa"; // Importing the Font Awesome icon
import { Link } from "react-router-dom";
import { CiShoppingCart } from "react-icons/ci";
import { useCookies } from 'react-cookie'; // Import useCookies

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cookies] = useCookies(['bytewiseCookies']); // Use cookies to check login status

  // Toggle the navigation menu for mobile
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Scroll to the top when navigating
  const scrollToTop = () => {
    window.scrollTo(0, 0);  // Scrolls to the top of the page
  }

  // Check login status based on cookies
  const isLoggedIn = cookies.bytewiseCookies && cookies.bytewiseCookies.status === true;

  // Close the menu when a navigation link is clicked
  const handleLinkClick = () => {
    setIsMenuOpen(false);
    scrollToTop();
  };

  return (
    <header>
      <div className="container">
        <div className="logo">
          {/* Add the logo image here */}
          <img src="logo-transparent-png.png" alt="ByteWise Logo" className="logo-img" />
          <p id="tagline">Your toolkit for engineering success</p>
        </div>
        
        {/* Navigation Bar */}
        <nav className={isMenuOpen ? "nav-active" : ""}>
          <ul className="nav-Links">
            <li><Link to="/" onClick={handleLinkClick}>Home</Link></li>
            <li><Link to="/notes" onClick={handleLinkClick}>Notes</Link></li>
            <li><Link to="/Lab-Manuals" onClick={handleLinkClick}>Lab Manuals</Link></li>
            <li><Link to="/courses" onClick={handleLinkClick}>Courses</Link></li>
          </ul>
          
          {/* Conditional rendering for Login/Profile button */}
          {isLoggedIn ? (
            <button className="profile-btn">
              <Link to='/profile'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                  <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
                </svg>
              </Link>
            </button>
          ) : (
            <button id="LoginBtn">
              <Link to='/login'>Login</Link>
            </button>
          )}

          {/* Cart Button */}
          <button className="cartprofile">
            <Link to='/cart' onClick={scrollToTop}><CiShoppingCart /></Link>
          </button>
        </nav>
        
        {/* Menu Icon for Mobile View */}
        <div className="menu-icon" onClick={toggleMenu}>
          <FaBars />
        </div>
      </div>
    </header>
  );
};

export default Header;

