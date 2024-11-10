import React from 'react';
import '../css/Filter.css'; // If you want to style this component separately

const Filter = ({ searchTerm, handleSearch, semester, handleSemesterChange, branch, handleBranchChange }) => {
  
  // This handles the search input, removing spaces and standardizing to uppercase
  const handleSearchInput = (event) => {
    const normalizedSearchTerm = event.target.value
      .replace(/\s+/g, '')  // Remove all spaces
      .toUpperCase();      // Convert to uppercase
    
    handleSearch(normalizedSearchTerm); // Call the parent handler with the normalized input
  };

  return (
    <div className="filters">
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearchInput} // Use the new normalized input handler
        className="search-bar"
      />

      {/* Semester Selector */}
      <select value={semester} onChange={handleSemesterChange} className="semester-selector">
        <option value="All">All Semesters</option>
        <option value="1st">1st Semester</option>
        <option value="2nd">2nd Semester</option>
        <option value="3rd">3rd Semester</option>
        <option value="4th">4th Semester</option>
        <option value="5th">5th Semester</option>
        <option value="6th">6th Semester</option>
        <option value="7th">7th Semester</option>
        <option value="8th">8th Semester</option>
      </select>

      {/* Branch Selector */}
      <select value={branch} onChange={handleBranchChange} className="branch-selector">
        <option value="All">All Branches</option>
        <option value="CSE">Computer Science</option>
        <option value="ECE">Electronics</option>
        {/* Add more branch options as needed */}
      </select>
    </div>
  );
};

export default Filter;
