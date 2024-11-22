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
          <div>
            <a id="inst" href="#">
              <svg
                width="30px"
                height="30px"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 551.034 551.034"
              >
                <g>
                  <linearGradient
                    id="grad1"
                    x1="275.517"
                    y1="4.5714"
                    x2="275.517"
                    y2="549.7202"
                    gradientTransform="matrix(1 0 0 -1 0 554)"
                  >
                    <stop offset="0" style={{ stopColor: "#E09B3D" }} />
                    <stop offset="0.3" style={{ stopColor: "#C74C4D" }} />
                    <stop offset="0.6" style={{ stopColor: "#C21975" }} />
                    <stop offset="1" style={{ stopColor: "#7024C4" }} />
                  </linearGradient>
                  <path
                    style={{ fill: "url(#grad1)" }}
                    d="M386.878,0H164.156C73.64,0,0,73.64,0,164.156v222.722c0,90.516,73.64,164.156,164.156,164.156h222.722c90.516,0,164.156-73.64,164.156-164.156V164.156C551.033,73.64,477.393,0,386.878,0z"
                  />
                  <circle cx="418.306" cy="134.072" r="34.149" />
                </g>
              </svg>
              bytewise24.pvt
            </a>
            <a id="face" href="#">
              <svg
                width="30px"
                height="30px"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 30 30"
              >
                <path d="M2 11.9556C2 8.47078 2 6.7284 2.67818 5.39739C3.27473 4.22661 4.22661 3.27473 5.39739 2.67818C6.7284 2 8.47078 2 11.9556 2H20.0444C23.5292 2 25.2716 2 26.6026 2.67818C27.7734 3.27473 28.7253 4.22661 29.3218 5.39739C30 6.7284 30 8.47078 30 11.9556V20.0444C30 23.5292 30 25.2716 29.3218 26.6026C28.7253 27.7734 27.7734 28.7253 26.6026 29.3218C25.2716 30 23.5292 30 20.0444 30H11.9556C8.47078 30 6.7284 30 5.39739 29.3218C4.22661 28.7253 3.27473 27.7734 2.67818 26.6026C2 25.2716 2 23.5292 2 20.0444V11.9556Z" />
              </svg>
              Facebook
            </a>
          </div>
          <p>
            Contact us: <br />
            Ayush Soni: +91-6266898048 <br />
            Akash Mali: +91-9893718536 <br />
            Hitesh Baghel: +91-7879025039 <br />
            Aarti Solanki: +91-8819934644
          </p>
        </div>
      </div>
      <footer>
        <p>© 2024 ByteWise24.vercel.app. All Rights Reserved.</p>
        <Link to="/t&c" onClick={scrollToTop}>
          Terms and conditions
        </Link>
        <Link to="/PrivacyPolicy" onClick={scrollToTop}>
          Privacy Policy
        </Link>
      </footer>
    </>
  );
};

export default Footer;
