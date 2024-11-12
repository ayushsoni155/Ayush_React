import React, { useState } from 'react';
import '../css/TermsAndConditions.css'

const TermsAndConditions = () => {
  const [isAgreed, setIsAgreed] = useState(false);

  const handleAgreeChange = (event) => {
    setIsAgreed(event.target.checked);
  };

  return (
    <div className="terms-container">
      <h1>Terms and Conditions</h1>
      
      <div className="terms-content">
        <h2>1. Introduction</h2>
        <p>
          Welcome to Bytewise. By using our website, you agree to the following terms and conditions. Please read them carefully.
        </p>

        <h2>2. Lab Manual Purchases</h2>
        <p>
          When purchasing lab manuals from Bytewise, please note the following:
        </p>
        <ul>
          <li>All purchases are final. There will be no refunds, returns, or cancellations after you have completed the purchase.</li>
          <li>If you encounter any issues related to your purchase, please contact our developers directly at <strong>support@bytewise.com</strong> for assistance.</li>
        </ul>

        <h2>3. Delivery of Lab Manuals</h2>
        <p>
          After purchasing your lab manuals, we will make every effort to deliver them to you within the time frame suitable for your college schedule. However, please note:
        </p>
        <ul>
          <li>We do not commit to any specific delivery time or date.</li>
          <li>The lab manuals will be delivered to you on the designated delivery date for your college.</li>
          <li>We will notify you with the details regarding the delivery time and date once the manuals are ready for distribution.</li>
        </ul>

        <h2>4. Contacting Developers</h2>
        <p>
          If you experience any issues with your order, including the need for a refund or return (though not possible under these terms), please contact the developers at <strong>support@bytewise.com</strong>. We are here to help resolve any concerns as best as possible within the limitations of our policy.
        </p>
        
        <h2>5. Agreement</h2>
        <p>
          By purchasing from our website, you agree to abide by these terms and conditions. If you do not agree with these terms, please do not proceed with any purchase.
        </p>
      </div>

      <div className="terms-agree">
        <input
          type="checkbox"
          id="agreeCheckbox"
          checked={isAgreed}
          onChange={handleAgreeChange}
        />
        <label htmlFor="agreeCheckbox">
          I have read and agree to the terms and conditions.
        </label>
      </div>

      <div className="terms-submit">
        <button disabled={!isAgreed} onClick={() => alert('Thank you for agreeing to the terms!')}>
          Proceed with Purchase
        </button>
      </div>
    </div>
  );
};

export default TermsAndConditions;
