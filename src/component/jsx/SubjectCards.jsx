import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import videoObj from '../../videoObj'; // Import the array
import '../css/Notes.css'; // Import CSS for styling
import Filter from './Filter'; // Import Filter component
import Notification from './Notification'; // Import Notification component
import CryptoJS from 'crypto-js'; // Import CryptoJS for decryption
import VideoPopup from './VideoPopup';

const SubjectCards = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [semester, setSemester] = useState('All');
  const [branch, setBranch] = useState('All');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to handle login status
  const [showLoginNotification, setShowLoginNotification] = useState(false); // Show notification if not logged in
  const [selectedVideo, setSelectedVideo] = useState(null); // State for selected video
  const [cookies] = useCookies(['bytewiseCookies']); // Use cookie hook

  const secretKey = process.env.REACT_APP_SECRET_KEY; // Encryption secret key
 const scrollToTop = () => {
    window.scrollTo(0, 0);
  };
  // Utility function to decrypt cookie
  const decryptCookie = (encryptedValue) => {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedValue, secretKey);
      return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    } catch (error) {
      console.error('Error decrypting cookie:', error);
      return null;
    }
  };

  useEffect(() => {
    // Check if the bytewiseCookies is present and decrypt it
    const encryptedData = cookies.bytewiseCookies;
    if (encryptedData) {
      const userData = decryptCookie(encryptedData);
      setIsLoggedIn(userData && userData.status); // Set login status based on decrypted data
    }
  }, [cookies]);

  // Normalize the search term, remove spaces and make uppercase
  const handleSearch = (term) => {
    setSemester('All');
    setBranch('All');
    setSearchTerm(term); // Update the search term directly
  };

  const handleSemesterChange = (e) => {
    setSemester(e.target.value);
  };

  const handleBranchChange = (e) => {
    setBranch(e.target.value);
  };

  // Filter notes based on the search term, semester, and branch
  const filteredVideo = videoObj.filter(video => {
    const normalizedSearchTerm = searchTerm.replace(/\s+/g, '').toUpperCase();
    const matchesName = video.name.toLowerCase().includes(normalizedSearchTerm.toLowerCase()) || video.Subject_code.replace(/\s+/g, '').toUpperCase().includes(normalizedSearchTerm);
    const matchesSemester = semester === 'All' || video.Sem === semester;
    const matchesBranch = branch === 'All' || video.branch === branch;
    return matchesName && matchesSemester && matchesBranch;
  });

  // Show video in an iframe if the user is logged in, otherwise show login notification
  const showVideo = (videoUrl) => {
    if (isLoggedIn) {
      scrollToTop();
      setSelectedVideo(videoUrl); // Set the selected video URL
    } else {
      scrollToTop();
      setSelectedVideo(videoUrl);
      //setShowLoginNotification(true); // Show notification if not logged in
    }
  };
  function extractVideoId(url) {
  const match = url.match(/(?:youtube\.com\/(?:embed\/|watch\?v=)|youtu\.be\/)([^?&/]+)/);
  return match ? match[1] : null;
}


  return (
    <div className="notes-page">
      <Filter
        searchTerm={searchTerm}
        handleSearch={handleSearch}
        semester={semester}
        handleSemesterChange={handleSemesterChange}
        branch={branch}
        handleBranchChange={handleBranchChange}
      />
       {selectedVideo && (
        <VideoPopup videoUrl={selectedVideo} onClose={() => setSelectedVideo(null)} />
      )}
      <div className="notes-container">
        {filteredVideo.length > 0 ? (
          filteredVideo.map((video, index) => (
            <div className="note-card" key={index} onClick={() => showVideo(video.videoUrl)}>
              <img src={`https://img.youtube.com/vi/${extractVideoId(video.videoUrl)}/0.jpg`}
    alt={video.name}
    className="note-image" />
              <div className="note-content">
                <h3 className="note-title">{video.name}</h3>
                <p className="note-description">{video.description}</p>
              </div>
            </div>
          ))
        ) : (
          <h2>No Video lecture found based on your search.</h2>
        )}
      </div>

      {showLoginNotification && (
        <Notification
          message="Please log in to view the video."
          type="warning"
          onClose={() => setShowLoginNotification(false)}
        />
      )}
    </div>
  );
};

export default SubjectCards;
