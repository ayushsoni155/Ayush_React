import React from 'react';
import '../css/Filter.css'; // If you want to style this component separately

const Filter = ({ searchTerm, handleSearch, semester, handleSemesterChange, branch, handleBranchChange }) => {
  
  // This handles the search input, removing spaces and standardizing to uppercase
  const handleSearchInput = (event) => {
    // Preventing unnecessary state manipulation directly within the handler
    const userInput = event.target.value;
    // Remove spaces and convert to uppercase before updating the state
    const normalizedSearchTerm = userInput.replace(/\s+/g, '').toUpperCase();
    
    handleSearch(normalizedSearchTerm); // Call the parent handler with the normalized input
  };

  return (
    <div className="filters">
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm} // Controlled input
        onChange={handleSearchInput} // Update value while typing
        className="search-bar"
      />

      {/* Semester Selector */}
      <select value={semester} onChange={handleSemesterChange} className="semester-selector">
        <option value="All">All Semesters</option>
        <option value="1">1st Semester</option>
        <option value="2">2nd Semester</option>
        <option value="3">3rd Semester</option>
        <option value="4">4th Semester</option>
        <option value="5">5th Semester</option>
        <option value="6">6th Semester</option>
        <option value="7">7th Semester</option>
        <option value="8">8th Semester</option>
      </select>

      {/* Branch Selector */}
      <select value={branch} onChange={handleBranchChange} className="branch-selector">
        <option value="All">All Branches</option>
        <option value="CSE">Computer Science</option>
{/*         <option value="ECE">Electronics</option> */}
        {/* Add more branch options as needed */}
      </select>
    </div>
  );
};

export default Filter;
