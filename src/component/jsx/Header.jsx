import React, { useState, useEffect } from "react";
import "../css/Header.css"; // Importing the CSS file
import { FaBars } from "react-icons/fa"; // Importing the Font Awesome icon
import { Link } from "react-router-dom";
import { CiShoppingCart } from "react-icons/ci";
import { useCookies } from 'react-cookie'; // Import useCookies

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cookies] = useCookies(['bytewiseCookies']); // Use cookies to check login status

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Optional: A state to trigger re-renders when cookies change
  const [isLoggedIn, setIsLoggedIn] = useState(!!cookies.bytewiseCookies);

  useEffect(() => {
    // Update logged-in state when cookies change
    setIsLoggedIn(!!cookies.bytewiseCookies);
  }, [cookies.bytewiseCookies]);

  return (
    <header>
      <div className="container">
        <div className="logo">
          <h1>ByteWise</h1>
          <p id="tagline">Your toolkit for engineering success</p>
        </div>
        <nav className={isMenuOpen ? "nav-active" : ""}>
          <ul className="nav-Links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/notes">Notes</Link></li>
            <li><Link to="/Lab-Manuals">Lab Manuals</Link></li>
            <li><Link to="/courses">Courses</Link></li>
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

          <button className="cartprofile">
            <Link to='/cart'><CiShoppingCart /></Link>
          </button>
        </nav>
        <div className="menu-icon" onClick={toggleMenu}>
          <FaBars />
        </div>
      </div>
    </header>
  );
};

export default Header;
