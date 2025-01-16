import React from 'react';
import '../css/VideoPopup.css'; // Import custom CSS for styling the popup

const VideoPopup = ({ videoUrl, onClose }) => {
  return (
    <div className="video-popup-overlay">
      <div className="video-popup-container">
        <button className="close-btn" onClick={onClose}>X</button>
        <div className="video-container">
          <iframe
            src={videoUrl}
            title="Video Player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default VideoPopup;
