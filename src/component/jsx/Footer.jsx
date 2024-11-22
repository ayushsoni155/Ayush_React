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
      <a id="inst" href="#">
        <svg width="30px" height="30px" fill="currentColor" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 551.034 551.034" style="enable-background:new 0 0 551.034 551.034;" xml:space="preserve">
<g id="XMLID_13_">
	
		<linearGradient id="XMLID_2_" gradientUnits="userSpaceOnUse" x1="275.517" y1="4.5714" x2="275.517" y2="549.7202" gradientTransform="matrix(1 0 0 -1 0 554)">
		<stop  offset="0" style="stop-color:#E09B3D"/>
		<stop  offset="0.3" style="stop-color:#C74C4D"/>
		<stop  offset="0.6" style="stop-color:#C21975"/>
		<stop  offset="1" style="stop-color:#7024C4"/>
	</linearGradient>
	<path id="XMLID_17_" style="fill:url(#XMLID_2_);" d="M386.878,0H164.156C73.64,0,0,73.64,0,164.156v222.722
		c0,90.516,73.64,164.156,164.156,164.156h222.722c90.516,0,164.156-73.64,164.156-164.156V164.156
		C551.033,73.64,477.393,0,386.878,0z M495.6,386.878c0,60.045-48.677,108.722-108.722,108.722H164.156
		c-60.045,0-108.722-48.677-108.722-108.722V164.156c0-60.046,48.677-108.722,108.722-108.722h222.722
		c60.045,0,108.722,48.676,108.722,108.722L495.6,386.878L495.6,386.878z"/>
	
		<linearGradient id="XMLID_3_" gradientUnits="userSpaceOnUse" x1="275.517" y1="4.5714" x2="275.517" y2="549.7202" gradientTransform="matrix(1 0 0 -1 0 554)">
		<stop  offset="0" style="stop-color:#E09B3D"/>
		<stop  offset="0.3" style="stop-color:#C74C4D"/>
		<stop  offset="0.6" style="stop-color:#C21975"/>
		<stop  offset="1" style="stop-color:#7024C4"/>
	</linearGradient>
	<path id="XMLID_81_" style="fill:url(#XMLID_3_);" d="M275.517,133C196.933,133,133,196.933,133,275.516
		s63.933,142.517,142.517,142.517S418.034,354.1,418.034,275.516S354.101,133,275.517,133z M275.517,362.6
		c-48.095,0-87.083-38.988-87.083-87.083s38.989-87.083,87.083-87.083c48.095,0,87.083,38.988,87.083,87.083
		C362.6,323.611,323.611,362.6,275.517,362.6z"/>
	
		<linearGradient id="XMLID_4_" gradientUnits="userSpaceOnUse" x1="418.306" y1="4.5714" x2="418.306" y2="549.7202" gradientTransform="matrix(1 0 0 -1 0 554)">
		<stop  offset="0" style="stop-color:#E09B3D"/>
		<stop  offset="0.3" style="stop-color:#C74C4D"/>
		<stop  offset="0.6" style="stop-color:#C21975"/>
		<stop  offset="1" style="stop-color:#7024C4"/>
	</linearGradient>
	<circle id="XMLID_83_" style="fill:url(#XMLID_4_);" cx="418.306" cy="134.072" r="34.149"/>
</g>
</svg>
        bytewise24.pvt
      </a>
      <a id="face" href="#">
        <svg width="30px" height="30px" viewBox="0 0 30 30" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 11.9556C2 8.47078 2 6.7284 2.67818 5.39739C3.27473 4.22661 4.22661 3.27473 5.39739 2.67818C6.7284 2 8.47078 2 11.9556 2H20.0444C23.5292 2 25.2716 2 26.6026 2.67818C27.7734 3.27473 28.7253 4.22661 29.3218 5.39739C30 6.7284 30 8.47078 30 11.9556V20.0444C30 23.5292 30 25.2716 29.3218 26.6026C28.7253 27.7734 27.7734 28.7253 26.6026 29.3218C25.2716 30 23.5292 30 20.0444 30H11.9556C8.47078 30 6.7284 30 5.39739 29.3218C4.22661 28.7253 3.27473 27.7734 2.67818 26.6026C2 25.2716 2 23.5292 2 20.0444V11.9556Z" fill="white"/>
            <path d="M22.0515 8.52295L16.0644 13.1954L9.94043 8.52295V8.52421L9.94783 8.53053V15.0732L15.9954 19.8466L22.0515 15.2575V8.52295Z" fill="#EA4335"/>
            <path d="M23.6231 7.38639L22.0508 8.52292V15.2575L26.9983 11.459V9.17074C26.9983 9.17074 26.3978 5.90258 23.6231 7.38639Z" fill="#FBBC05"/>
            <path d="M22.0508 15.2575V23.9924H25.8428C25.8428 23.9924 26.9219 23.8813 26.9995 22.6513V11.459L22.0508 15.2575Z" fill="#34A853"/>
            <path d="M9.94811 24.0001V15.0732L9.94043 15.0669L9.94811 24.0001Z" fill="#C5221F"/>
            <path d="M9.94014 8.52404L8.37646 7.39382C5.60179 5.91001 5 9.17692 5 9.17692V11.4651L9.94014 15.0667V8.52404Z" fill="#C5221F"/>
            <path d="M9.94043 8.52441V15.0671L9.94811 15.0734V8.53073L9.94043 8.52441Z" fill="#C5221F"/>
            <path d="M5 11.4668V22.6591C5.07646 23.8904 6.15673 24.0003 6.15673 24.0003H9.94877L9.94014 15.0671L5 11.4668Z" fill="#4285F4"/>
          </svg>
          bytewise24.pvt@gmail.com
      </a>
      <a id="twit" href="#">
        <svg width="30px" height="30px" viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="14" fill="url(#paint0_linear_87_7225)"/>
            <path d="M22.9866 10.2088C23.1112 9.40332 22.3454 8.76755 21.6292 9.082L7.36482 15.3448C6.85123 15.5703 6.8888 16.3483 7.42147 16.5179L10.3631 17.4547C10.9246 17.6335 11.5325 17.541 12.0228 17.2023L18.655 12.6203C18.855 12.4821 19.073 12.7665 18.9021 12.9426L14.1281 17.8646C13.665 18.3421 13.7569 19.1512 14.314 19.5005L19.659 22.8523C20.2585 23.2282 21.0297 22.8506 21.1418 22.1261L22.9866 10.2088Z" fill="white"/>
            <defs>
            <linearGradient id="paint0_linear_87_7225" x1="16" y1="2" x2="16" y2="30" gradientUnits="userSpaceOnUse">
            <stop stop-color="#37BBFE"/>
            <stop offset="1" stop-color="#007DBB"/>
            </linearGradient>
            </defs>
          </svg>
        @Bytewise24
      </a> 
    </div>
  </div>
  <div class="developer-dropdown">
    <label for="developer-select" class="dropdown-label">Developers:</label>
    <select id="developer-select">
      <option value="@dev_alex"><a href="#">ByteWise24</a></option>
      <option value="@dev_alex"><a href="#">Ayush Soni</a></option>
      <option value="@dev_sam"><a href="#">Hitesh Baghel</a></option>
      <option value="@dev_emma"><a href="#">Akash Mali</a></option>
    </select>
</div>
</div>
  <footer>
  <p>© 2024 ByteWise24.vercel.app. All Rights Reserved.</p>
  <Link to="/t&c" onClick={scrollToTop}>Terms and conditions</Link>
  <Link to="/PrivacyPolicy" onClick={scrollToTop}>PrivacyPolicy</Link>
</footer>
    </>
  );
};

export default Footer;
