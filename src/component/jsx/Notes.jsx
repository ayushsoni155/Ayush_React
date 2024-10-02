import React, { useState } from 'react';
import notesObj from '../../NotesObj'; // Import the array
import '../css/Notes.css'; // Import CSS for styling
import Filter from './Filter'; // Import Filter component
import PdfViewer from '../jsx/PdfViewer.jsx'; // Import PdfViewer component

const Notes = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [semester, setSemester] = useState('All');
  const [branch, setBranch] = useState('All');
  const [selectedPdf, setSelectedPdf] = useState(null); // State for selected PDF

  const handleSearch = (e) => {
    setSemester('All');
    setBranch('All');
    setSearchTerm(e.target.value);
  };

  const handleSemesterChange = (e) => {
    setSemester(e.target.value);
  };

  const handleBranchChange = (e) => {
    setBranch(e.target.value);
  };

  const filteredNotes = notesObj.filter(note => {
    const matchesName = note.name.toLowerCase().includes(searchTerm.toLowerCase()) || note.Subject_code.toUpperCase().includes(searchTerm.toUpperCase());
    const matchesSemester = semester === 'All' || note.Sem === semester;
    const matchesBranch = branch === 'All' || note.branch === branch;
    return matchesName && matchesSemester && matchesBranch;
  });

  const handleNoteClick = (pdfUrl) => {
    setSelectedPdf(pdfUrl); // Set the selected PDF
  };

  const closeModal = () => {
    setSelectedPdf(null); // Close the modal
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
        {filteredNotes.map((note, index) => (
          <div className="note-card" key={index} onClick={() => handleNoteClick(note.pdfUrl)}>
            <img src={note.image} alt={note.name} className="note-image" />
            <div className="note-content">
              <h3 className="note-title">{note.name}</h3>
              <p className="note-description">{note.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Show the PDF viewer modal if selectedPdf is not null */}
      {selectedPdf && <PdfViewer pdfUrl={selectedPdf} onClose={closeModal} />}
    </div>
  );
};

export default Notes;
