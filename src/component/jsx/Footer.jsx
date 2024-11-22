import React from 'react';
import '../css/Footer.css'; // Import your custom CSS for styling
import { Link } from 'react-router-dom';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo(0, 0); // Scrolls to the top of the page
  };

  return (
    <>
      <div id="contact">
        <div id="r1">
          <span>Connect with us!</span>
        </div>
        <div id="c1">
          <img src="/LandingPageimg3.png" alt="Social Media Connect" />
        </div>
        <div id="c2">
          <span>Social Media</span>
          <a id="inst" href="#" aria-label="Instagram">
            {/* Instagram SVG */}
            <svg
              width="30px"
              height="30px"
              fill="currentColor"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              viewBox="0 0 551.034 551.034"
              style={{ enableBackground: 'new 0 0 551.034 551.034' }}
              xmlSpace="preserve"
            >
              <g id="XMLID_13_">
                <linearGradient
                  id="XMLID_2_"
                  gradientUnits="userSpaceOnUse"
                  x1="275.517"
                  y1="4.5714"
                  x2="275.517"
                  y2="549.7202"
                  gradientTransform="matrix(1 0 0 -1 0 554)"
                >
                  <stop offset="0" style={{ stopColor: '#E09B3D' }} />
                  <stop offset="0.3" style={{ stopColor: '#C74C4D' }} />
                  <stop offset="0.6" style={{ stopColor: '#C21975' }} />
                  <stop offset="1" style={{ stopColor: '#7024C4' }} />
                </linearGradient>
                <path
                  id="XMLID_17_"
                  style={{ fill: 'url(#XMLID_2_)' }}
                  d="M386.878,0H164.156C73.64,0,0,73.64,0,164.156v222.722
                    c0,90.516,73.64,164.156,164.156,164.156h222.722c90.516,0,164.156-73.64,164.156-164.156V164.156
                    C551.033,73.64,477.393,0,386.878,0z M495.6,386.878c0,60.045-48.677,108.722-108.722,108.722H164.156
                    c-60.045,0-108.722-48.677-108.722-108.722V164.156c0-60.046,48.677-108.722,108.722-108.722h222.722
                    c60.045,0,108.722,48.676,108.722,108.722L495.6,386.878L495.6,386.878z"
                />
                <circle
                  id="XMLID_83_"
                  cx="418.306"
                  cy="134.072"
                  r="34.149"
                  style={{ fill: '#C21975' }}
                />
              </g>
            </svg>
            bytewise24.pvt
          </a>
          <a id="face" href="mailto:bytewise24.pvt@gmail.com" aria-label="Email">
            {/* Email SVG */}
            <svg
              width="30px"
              height="30px"
              viewBox="0 0 30 30"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M2 11.9556C2 8.47078 2 6.7284..." />
            </svg>
            bytewise24.pvt@gmail.com
          </a>
          <a id="twit" href="#" aria-label="Twitter">
            {/* Twitter SVG */}
            <svg
              width="30px"
              height="30px"
              viewBox="0 0 32 32"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="16" cy="16" r="14" fill="#37BBFE" />
              <path d="M22.9866 10.2088C23.1112 9..." />
            </svg>
            @Bytewise24
          </a>
        </div>
      </div>
      <div className="developer-dropdown">
        <label htmlFor="developer-select" className="dropdown-label">
          Developers:
        </label>
        <select id="developer-select">
          <option value="bytewise24">ByteWise24</option>
          <option value="ayush-soni">Ayush Soni</option>
          <option value="hitesh-baghel">Hitesh Baghel</option>
          <option value="akash-mali">Akash Mali</option>
        </select>
      </div>
      <footer>
        <p>© 2024 ByteWise24.vercel.app. All Rights Reserved.</p>
        <Link to="/t&c" onClick={scrollToTop}>
          Terms and Conditions
        </Link>
        {' | '}
        <Link to="/PrivacyPolicy" onClick={scrollToTop}>
          Privacy Policy
        </Link>
      </footer>
    </>
  );
};

export default Footer;
