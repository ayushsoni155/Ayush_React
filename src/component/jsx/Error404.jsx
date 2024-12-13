import React from "react";
import "../css/MaintenancePage.css"; // Create a CSS file for styles

const Error404 = () => {
  return (
    <div className="maintenance-page">
      <div className="animation-container">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="gear-svg"
          viewBox="0 0 100 100"
          fill="none"
        >
          <circle cx="50" cy="50" r="45" stroke="#FF0000" strokeWidth="10" />
          <line x1="50" y1="5" x2="50" y2="25" stroke="#FF0000" strokeWidth="5" />
          <line x1="95" y1="50" x2="75" y2="50" stroke="#FF0000" strokeWidth="5" />
          <line x1="50" y1="95" x2="50" y2="75" stroke="#FF0000" strokeWidth="5" />
          <line x1="5" y1="50" x2="25" y2="50" stroke="#FF0000" strokeWidth="5" />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="gear-svg"
          viewBox="0 0 100 100"
          fill="none"
        >
          <circle cx="50" cy="50" r="45" stroke="#FFFF00" strokeWidth="10" />
          <line x1="50" y1="5" x2="50" y2="25" stroke="#FFFF00" strokeWidth="5" />
          <line x1="95" y1="50" x2="75" y2="50" stroke="#FFFF00" strokeWidth="5" />
          <line x1="50" y1="95" x2="50" y2="75" stroke="#FFFF00" strokeWidth="5" />
          <line x1="5" y1="50" x2="25" y2="50" stroke="#FFFF00" strokeWidth="5" />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="gear-svg"
          viewBox="0 0 100 100"
          fill="none"
        >
          <circle cx="50" cy="50" r="45" stroke=" #00ff00" strokeWidth="10" />
          <line x1="50" y1="5" x2="50" y2="25" stroke=" #00ff00" strokeWidth="5" />
          <line x1="95" y1="50" x2="75" y2="50" stroke=" #00ff00" strokeWidth="5" />
          <line x1="50" y1="95" x2="50" y2="75" stroke=" #00ff00" strokeWidth="5" />
          <line x1="5" y1="50" x2="25" y2="50" stroke=" #00ff00" strokeWidth="5" />
        </svg>
      </div>
    <h1 className="message">Error 404</h1>
<p className="sub-message">
  Something went wrong! Please check the URL or try again later.
</p>

    </div>
  );
};

export default Error404;
