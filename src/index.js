// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import reportWebVitals from './reportWebVitals';
// import App from './App';


// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App/>
//   </React.StrictMode>
// );

// reportWebVitals();


import React from 'react';
import ReactDOM from 'react-dom/client';
import { useCookies } from 'react-cookie';
import CryptoJS from 'crypto-js'; // Import CryptoJS for decryption
import './index.css';
import reportWebVitals from './reportWebVitals';
import App from './App';
import Reply from './component/jsx/Reply';

const secretKey = process.env.REACT_APP_SECRET_KEY;



const decryptCookie = (encryptedValue) => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedValue, secretKey);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } catch (error) {
    console.error('Error decrypting cookie:', error);
    return null;
  }
};

const Main = () => {
  const [cookies] = useCookies(['bytewiseCookies']);
  const encryptedData = cookies.bytewiseCookies;

  let enrolmentID = null;
  if (encryptedData) {
    const userData = decryptCookie(encryptedData);
    if (userData && userData.status) {
      enrolmentID = userData.enrolmentID;
    }
  }

  return (
    <React.StrictMode>
      {enrolmentID=='0704CS221208'? <Reply /> : <App />}
    </React.StrictMode>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Main />);

reportWebVitals();
