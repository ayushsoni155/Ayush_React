// import React from "react";
// import "../css/MaintenancePage.css"; // Create a CSS file for styles

// const MaintenancePage = () => {
//   return (
//     <div className="maintenance-page">
//       <div className="animation-container">
//         <div className="gear"></div>
//         <div className="gear"></div>
//         <div className="gear"></div>
//       </div>
//       <h1 className="message">Our website is currently under maintenance</h1>
//       <p className="sub-message">We are working hard to bring you a better experience. Please check back later!</p>
//     </div>
//   );
// };

// export default MaintenancePage;
import React from "react";
import "../css/MaintenancePage.css"; // Create a CSS file for styles

const MaintenancePage = () => {
  return (
    <div className="maintenance-page">
      <div className="animation-container">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="gear-svg"
          viewBox="0 0 100 100"
          fill="none"
        >
          <circle cx="50" cy="50" r="45" stroke="#4d97e1" strokeWidth="10" />
          <line x1="50" y1="5" x2="50" y2="25" stroke="#4d97e1" strokeWidth="5" />
          <line x1="95" y1="50" x2="75" y2="50" stroke="#4d97e1" strokeWidth="5" />
          <line x1="50" y1="95" x2="50" y2="75" stroke="#4d97e1" strokeWidth="5" />
          <line x1="5" y1="50" x2="25" y2="50" stroke="#4d97e1" strokeWidth="5" />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="gear-svg"
          viewBox="0 0 100 100"
          fill="none"
        >
          <circle cx="50" cy="50" r="45" stroke="#ff6f61" strokeWidth="10" />
          <line x1="50" y1="5" x2="50" y2="25" stroke="#ff6f61" strokeWidth="5" />
          <line x1="95" y1="50" x2="75" y2="50" stroke="#ff6f61" strokeWidth="5" />
          <line x1="50" y1="95" x2="50" y2="75" stroke="#ff6f61" strokeWidth="5" />
          <line x1="5" y1="50" x2="25" y2="50" stroke="#ff6f61" strokeWidth="5" />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="gear-svg"
          viewBox="0 0 100 100"
          fill="none"
        >
          <circle cx="50" cy="50" r="45" stroke="#ffd700" strokeWidth="10" />
          <line x1="50" y1="5" x2="50" y2="25" stroke="#ffd700" strokeWidth="5" />
          <line x1="95" y1="50" x2="75" y2="50" stroke="#ffd700" strokeWidth="5" />
          <line x1="50" y1="95" x2="50" y2="75" stroke="#ffd700" strokeWidth="5" />
          <line x1="5" y1="50" x2="25" y2="50" stroke="#ffd700" strokeWidth="5" />
        </svg>
      </div>
      <h1 className="message">Our website is currently under maintenance</h1>
      <p className="sub-message">
        We are working hard to bring you a better experience. Please check back
        later!
      </p>
    </div>
  );
};

export default MaintenancePage;
