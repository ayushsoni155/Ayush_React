import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import Notification from "./Notification";
import CryptoJS from "crypto-js";
import "../css/Feedback.css";

const secretKey = process.env.REACT_APP_SECRET_KEY; // Your secret key for encryption/decryption

export default function Feedback() {
  const [cookies] = useCookies(["bytewiseCookies"]);
  const [formData, setFormData] = useState({
    name: "",
    enrolmentID: "",
    message: "",
  });
  const [notification, setNotification] = useState({
    message: "",
    type: "",
    visible: false,
  });
const [loading ,setLoading] = useState (false);
  const decryptCookie = (encryptedCookie) => {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedCookie, secretKey);
      const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      return decryptedData;
    } catch (error) {
      console.error("Error decrypting cookie:", error);
      return null;
    }
  };

  useEffect(() => {
    const encryptedCookie = cookies.bytewiseCookies;
    if (encryptedCookie) {
      const userData = decryptCookie(encryptedCookie);
      if (userData) {
        setFormData({
          name: userData.name || "",
          enrolmentID: userData.enrolmentID || "",
          message: "",
        });
      }
    }
  }, [cookies]);

  const handleMessageChange = (event) => {
    setFormData((prevData) => ({
      ...prevData,
      message: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    const feedbackData = {
      name: formData.name,
      enrolmentID: formData.enrolmentID,
      feedback: formData.message, // Backend expects 'feedback' field
    };
    try {
      const response = await fetch(
        "https://bytewise-server.vercel.app/api/feedback-submit",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(feedbackData),
        }
      );
      if (response.ok) {
        setNotification({
          message: "Feedback submitted successfully.",
          type: "success",
          visible: true,
        });
        setFormData((prevData) => ({
          ...prevData,
          message: "",
        }));
      } else {
        setNotification({
          message: "Error submitting feedback.",
          type: "error",
          visible: true,
        });
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      setNotification({
        message: "Error submitting feedback. Please try again later.",
        type: "error",
        visible: true,
      });
    }
    setLoading(false);
  };

  return (
    <>
      {notification.visible && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification({ ...notification, visible: false })}
        />
      )}

      {cookies.bytewiseCookies && decryptCookie(cookies.bytewiseCookies)?.status ? (
      <div className="feedback-section">
  <h2 className="feedback-heading">We Value Your Feedback</h2>
  <div className="letter-container">
    <div className="letter-header">
      <h3>To</h3>
      <h3>The ByteWise Team</h3>
    </div>
    <form className="feedback-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label id='feedbackLabel' htmlFor="message">Message:</label>
        <textarea
          id="message"
          name="message"
          rows="5"
          value={formData.message}
          onChange={handleMessageChange}
          required
        ></textarea>
      </div>
      <div className="letter-footer">
        <h3>From</h3>
        <h3>{formData.name}</h3>
        <h3>{formData.enrolmentID}</h3>
      </div>
      {loading?(<div class="loading-circle"></div>):(
      <button type="submit" className="submit-btn">
        Submit
      </button>)}
    </form>
  </div>
</div>

      ) : (
        <div className="feedback-section">
          <h2 className="feedback-heading">Please log in to provide feedback.</h2>
        </div>
      )}
    </>
  );
}
