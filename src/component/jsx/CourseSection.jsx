
import React from "react";
import '../css/CourseSection.css';  // Import the CSS file
import courses from '../../coursesObj';  // Import the courses data

const CourseSection = () => {
  return (
    <div className="course-container">
      <h1>Free Online Courses from Leading Platforms</h1>
      <p>Complete the following courses to earn certifications from top organizations:</p>
      <div className="course-grid">
        {courses.map((course, index) => (
          <div key={index} className="course-card">
            <a href={course.link} target="_blank" rel="noopener noreferrer" className="course-link">
              <img src={course.image} alt={course.title} className="course-image" /> {/* Adding the image */}
              <h2>{course.title}</h2>
            </a>
            <p className="course-description">{course.description}</p>
            <p className="course-duration">Duration: {course.duration}</p>
            <p className="course-difficulty">Difficulty: {course.difficulty}</p>
            <p className="course-organization">Organization: {course.organization}</p>
            <a href={course.link} className="course-link" target="_blank" rel="noopener noreferrer">
              <button className="course-btn">Start Course</button>
            </a>
          </div>
        ))}
      </div>
      <p className="course-note">
        <strong>Note:</strong> Sign up with your Gmail account to complete the course (depending on the platform).
      </p>
    </div>
  );
};

export default CourseSection;
