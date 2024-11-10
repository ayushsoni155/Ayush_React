import React from "react";
import '../css/CourseSection.css';  // Import the CSS file
import courses from '../../coursesObj';  // Import the courses data

const CourseSection = () => {
  return (
    <div className="course-container">
      <h1>Microsoft Free Online Courses</h1>
      <p>Complete the following courses to earn certifications:</p>
      <div className="course-grid">
        {courses.map((course, index) => (
          <div key={index} className="course-card">
            <a href={course.link} target="_blank" rel="noopener noreferrer" className="course-link">
              <h2>{course.title}</h2>
            </a>
            <p className="course-description">{course.description}</p>
            <p className="course-duration">Duration: {course.duration}</p>
            <p className="course-difficulty">Difficulty: {course.difficulty}</p>
            <a href={course.link} className="course-link" target="_blank" rel="noopener noreferrer">
              <button className="course-btn">Start Course</button>
            </a>
          </div>
        ))}
      </div>
      <p className="course-note">
        <strong>Note:</strong> Sign up with your Gmail account to complete the course.
      </p>
    </div>
  );
};

export default CourseSection;
