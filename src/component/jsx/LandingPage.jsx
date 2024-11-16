import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import '../css/LandingPage.css'; // Import CSS for styling
import Product from '../jsx/Product';

const LandingPage = () => {
  const notesArray = [ 
    { 
        name: "Engineering Chemistry", 
        Subject_code: "BT101", 
        Sem: "1st", 
        description: "It focuses on the study of chemical principles and their applications in engineering.", 
        image: '/Eng_Chemistry.png', 
        branch: "CSE",
        pdfUrl:'/NotesPDF/temp.pdf'
        
    }, 
    { 
        name: "Mathematics - I (M1)", 
        Subject_code: "BT102", 
        Sem: "1st", 
        description: "It covers basic concepts of calculus, algebra, and geometry.", 
        image: '/Eng_M1.png', 
        branch: "CSE", 
        pdfUrl:'/NotesPDF/M1Notes.pdf'
    }, 
    { 
        name: "English for Communication", 
        Subject_code: "BT103", 
        Sem: "1st", 
        description: "It focuses on improving language skills like speaking, writing, listening, and reading.", 
        image: '/Eng_EnglishForCommunication.png', 
        branch: "CSE", pdfUrl:'/NotesPDF/temp.pdf' 
    }, 
    { 
        name: "Basic Electrical and Electronics Engineering", 
        Subject_code: "BT104", 
        Sem: "1st", 
        description: "It covers fundamental concepts of electricity, circuits, electrical machines, and electronic devices.", 
        image: '/Eng_Beee.png', 
         branch: "CSE", pdfUrl:'/NotesPDF/temp.pdf' 
    }, 
    { 
        name: "Engineering Graphics", 
        Subject_code: "BT105", 
        Sem: "1st", 
        description: " It teaches the basics of technical drawing, including projections, drafting, and visualization of objects.", 
        image: '/Eng_Ed.png',  
        branch: "CSE",
        pdfUrl:'/NotesPDF/EDNotes.pdf' 
    }
  ]

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
      const perfectName = firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
      setName(perfectName);  // Set only the first name
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
          <h1 id="heading">Welcome {name},</h1>
          <p id="heading2">To ByteWise, We provide you
          <span id="HeadingTagline">{tagline}</span></p>
        </div>

        <div className="hero-image">
          <img className="LandingPageImg" src="/LandingPageimg4.png" alt="Education Illustration" />
        </div>
      </section>
     <section id='products'>
     <Product products={notesArray}/>
      
     </section>
      <section id="aboutUs">
        <h2 id="aboutUsHeading">About Us</h2>
          <p>
            ByteWise is your ultimate toolkit for engineering success, offering an extensive collection of study
            materials tailored to meet the needs of engineering students. Our platform provides comprehensive notes,
            practical files, and lab manuals across various engineering disciplines, making it easier for students to
            access key resources in one place. Whether you're looking for the latest courses offering free certifications,
            or simply want to browse through notes filtered by semester and branch, ByteWise ensures you stay ahead in
            your academic journey. With a user-friendly interface and a dedicated section for easy downloads, ByteWise
            empowers you to excel in your studies and build a solid foundation for your career.
          </p>
      </section>
    </div>
  );
};

export default LandingPage;