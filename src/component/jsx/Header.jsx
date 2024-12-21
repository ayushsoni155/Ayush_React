import React, { useState, useEffect } from "react";
import "../css/Header.css";
import { FaBars } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { CiShoppingCart } from "react-icons/ci";
import { useCookies } from "react-cookie";
import CryptoJS from "crypto-js";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cookies, , removeCookie] = useCookies(["bytewiseCookies"]);
  const navigate = useNavigate();
  const secretKey = process.env.REACT_APP_SECRET_KEY;

  // Decrypt cookie data securely
  const decryptCookie = (encryptedValue) => {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedValue, secretKey);
      return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    } catch (error) {
      console.error("Error decrypting cookie:", error);
      return null;
    }
  };

  // Retrieve and decrypt login cookie
  const loginData = cookies.bytewiseCookies
    ? decryptCookie(cookies.bytewiseCookies)
    : null;

  // Verify user data from cookies with the backend
  useEffect(() => {
    const verifyUser = async () => {
      if (loginData) {
        try {
          const response = await fetch(
            `https://bytewise-server.vercel.app/api/verify`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                enrolmentID: loginData.enrolmentID,
                name: loginData.name,
                sem: loginData.sem,
                phone: loginData.phone,
                status: loginData.status,
              }),
            }
          );

          const result = await response.json();

          if (response.ok && result.valid) {
            console.log("User verified successfully");
          } else {
            console.error("User verification failed");
            removeCookie("bytewiseCookies");
            navigate("/login");
          }
        } catch (error) {
          console.error("Error verifying user:", error);
          removeCookie("bytewiseCookies");
          navigate("/login");
        }
      }
    };

    verifyUser();
  }, [loginData, navigate, removeCookie]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
    scrollToTop();
  };

  return (
    <header>
      <div className="container">
        <div className="logo">
          <Link to="/" onClick={handleLinkClick}>
            <img
              src="logo-transparent-png.png"
              alt="ByteWise Logo"
              className="logo-img"
            />
          </Link>
          <p id="tagline">Your toolkit for engineering success</p>
        </div>
        <nav className={isMenuOpen ? "nav-active" : ""}>
          <ul className="nav-links">
            <li>
              <Link to="/" onClick={handleLinkClick}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/notes" onClick={handleLinkClick}>
                Notes
              </Link>
            </li>
            <li>
              <Link to="/lab-manuals" onClick={handleLinkClick}>
                Lab Manuals
              </Link>
            </li>
            <li>
              <Link to="/courses" onClick={handleLinkClick}>
                Courses
              </Link>
            </li>
          </ul>
          {loginData ? (
            <button className="profile-btn">
              <Link to="/profile">Profile</Link>
            </button>
          ) : (
            <button id="LoginBtn">
              <Link to="/login">Login</Link>
            </button>
          )}
          <button className="cartprofile">
            <Link to="/cart" onClick={scrollToTop}>
              <CiShoppingCart />
            </Link>
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
