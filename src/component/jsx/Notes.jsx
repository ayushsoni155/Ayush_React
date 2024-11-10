import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import notesObj from '../../NotesObj'; // Import the array
import '../css/Notes.css'; // Import CSS for styling
import Filter from './Filter'; // Import Filter component
import Notification from './Notification'; // Import Notification component

const Notes = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [semester, setSemester] = useState('All');
  const [branch, setBranch] = useState('All');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to handle login status
  const [showLoginNotification, setShowLoginNotification] = useState(false); // Show notification if not logged in
  const [cookies] = useCookies(['bytewiseCookies']); // Use cookie hook

  useEffect(() => {
    // Check if the bytewiseCookies is present
    const userData = cookies.bytewiseCookies;
    setIsLoggedIn(userData && userData.status); // Set login status based on cookie presence
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
  const filteredNotes = notesObj.filter(note => {
    // Normalize the search term by removing spaces and making it uppercase
    const normalizedSearchTerm = searchTerm.replace(/\s+/g, '').toUpperCase();
    const matchesName = note.name.toLowerCase().includes(normalizedSearchTerm.toLowerCase()) || note.Subject_code.replace(/\s+/g, '').toUpperCase().includes(normalizedSearchTerm);
    const matchesSemester = semester === 'All' || note.Sem === semester;
    const matchesBranch = branch === 'All' || note.branch === branch;
    return matchesName && matchesSemester && matchesBranch;
  });

  // Open PDF if the user is logged in, otherwise show login notification
  const openPDF = (pdfUrl) => {
    if (isLoggedIn) {
      window.open(pdfUrl, '_blank'); // Open the PDF in a new tab if logged in
    } else {
      setShowLoginNotification(true); // Show notification if not logged in
    }
  };

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
      <div className="notes-container">
        {filteredNotes.length > 0 ? (
          filteredNotes.map((note, index) => (
            <div className="note-card" key={index} onClick={() => openPDF(note.pdfUrl)}>
              <img src={note.image} alt={note.name} className="note-image" />
              <div className="note-content">
                <h3 className="note-title">{note.name}</h3>
                <p className="note-description">{note.description}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="no-notes">No notes found based on your filter.</p>
        )}
      </div>

      {showLoginNotification && (
        <Notification
          message="Please log in to view the PDF."
          type="warning"
          onClose={() => setShowLoginNotification(false)}
        />
      )}
    </div>
  );
};

export default Notes;
