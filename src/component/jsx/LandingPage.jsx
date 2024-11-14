import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import '../css/LandingPage.css'; // Import CSS for styling

const LandingPage = () => {
  const [name, setName] = useState('');  // State for the first name
  const [cookies] = useCookies(['bytewiseCookies']);
  const [tagline, setTagline] = useState('Free Notes');
  
  // Array of taglines to rotate
  const taglines = ['Free Notes', 'Free Courses', 'Affordable Lab Manuals'];

  useEffect(() => {
    const userData = cookies.bytewiseCookies;
    if (userData && userData.status) { // Check if user is logged in
      const fullName = userData.name;
      const firstName = fullName.split(' ')[0]; // Get only the first name (before space)
      setName(firstName);  // Set only the first name
    }
    
    // Rotating the tagline every 2 seconds
    const interval = setInterval(() => {
      setTagline((prevTagline) => {
        const currentIndex = taglines.indexOf(prevTagline);
        const nextIndex = (currentIndex + 1) % taglines.length;
        return taglines[nextIndex];
      });
    }, 2000);

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, [cookies]);

  return (
    <div className="landing-page">
      <section className="hero">
        <div className="hero-content">
          <h1 id="heading">Welcome, {name}</h1>
          <p id="heading2">To ByteWise, We provide you</p>
          <span id="HeadingTagline">{tagline}</span>
        </div>

        <div className="hero-image">
          <img className="LandingPageImg" src="/LandingPageimg4.png" alt="Education Illustration" />
        </div>
      </section>

      <section id="aboutUs">
        <h2 id="aboutUsHeading">About Us</h2>
        <div className="about-us-content">
          <img className="LandingPageImg" src="/LandingPageimg2.png" alt="About Us Illustration" />
          <p>
            ByteWise is your ultimate toolkit for engineering success, offering an extensive collection of study
            materials tailored to meet the needs of engineering students. Our platform provides comprehensive notes,
            practical files, and lab manuals across various engineering disciplines, making it easier for students to
            access key resources in one place. Whether you're looking for the latest courses offering free certifications,
            or simply want to browse through notes filtered by semester and branch, ByteWise ensures you stay ahead in
            your academic journey. With a user-friendly interface and a dedicated section for easy downloads, ByteWise
            empowers you to excel in your studies and build a solid foundation for your career.
          </p>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
