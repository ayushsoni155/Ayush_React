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
            <strong>Your Reply:</strong> Bhadwe tujse esi website bane to batana BKL tuje kisi me back nahi hena per tu teri gand ka jor laga kar bhi esi website  nahi bana sakta.
          </p>
          <h1>LODU,BKL</h1>
        </div>
      </div>
    </div>
  );
};

export default Reply;
