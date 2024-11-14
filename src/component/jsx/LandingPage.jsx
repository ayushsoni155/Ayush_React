import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import '../css/LandingPage.css'; // Import CSS for styling

const LandingPage = () => {
  const [name, setName] = useState('User');
  const [cookies] = useCookies(['bytewiseCookies']);

  useEffect(() => {
    const userData = cookies.bytewiseCookies;
    if (userData && userData.status) { // Check if user is logged in
      setName(userData.name);
    }
  }, [cookies]);

  return (
    <div className="landing-page">
      <section className="hero">
        <div className="hero-content">
          <b id="heading">Welcome {name},</b>
          <br />
          <span id="HeadingTagline">To ByteWise</span>
        </div>

        <div className="hero-image">
          <img className="LandingPageImg" src="/LandingPageimg4.png" alt="Education Illustration" />
        </div>
      </section>

      <p id="aboutUsHeading">About Us</p>
      <div id="aboutUS">
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
    </div>
  );
};

export default LandingPage;