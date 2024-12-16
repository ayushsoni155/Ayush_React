import React from "react";
import "../css/Reply.css"; // Link to your custom styles

const Reply = () => {
  return (
    <div className="reply-container">
      {/* Image Section */}
      <div className="image-container">
        <img
          src="./ReplyIMG.png"
          alt="Reply Illustration"
          className="reply-image"
        />
      </div>
      <div className="admin-reply-card">
        <h3>Admin Reply</h3>
        <div className="submitted-reply">
          <p>
            <strong>Your Reply:</strong> Thank you for reaching out. We value
            your feedback and will get back to you shortly.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Reply;
