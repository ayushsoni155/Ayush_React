import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import Typed from 'typed.js';
import CryptoJS from 'crypto-js';
import '../css/LandingPage.css'; // Import CSS for styling
import Product from '../jsx/Product';
const secretKey = process.env.REACT_APP_SECRET_KEY; // Encryption secret key

const LandingPage = () => {
  const notesArray = [
    {
      name: 'Engineering Chemistry',
      Subject_code: 'BT101',
      Sem: '1st',
      description: 'It focuses on the study of chemical principles and their applications in engineering.',
      image: '/Eng_Chemistry.png',
      branch: 'CSE',
      pdfUrl: '/NotesPDF/temp.pdf',
    },
    {
      name: 'Mathematics - I (M1)',
      Subject_code: 'BT102',
      Sem: '1st',
      description: 'It covers basic concepts of calculus, algebra, and geometry.',
      image: '/Eng_M1.png',
      branch: 'CSE',
      pdfUrl: '/NotesPDF/M1Notes.pdf',
    },
    {
      name: 'English for Communication',
      Subject_code: 'BT103',
      Sem: '1st',
      description: 'It focuses on improving language skills like speaking, writing, listening, and reading.',
      image: '/Eng_EnglishForCommunication.png',
      branch: 'CSE',
      pdfUrl: '/NotesPDF/temp.pdf',
    },
    {
      name: 'Basic Electrical and Electronics Engineering',
      Subject_code: 'BT104',
      Sem: '1st',
      description: 'It covers fundamental concepts of electricity, circuits, electrical machines, and electronic devices.',
      image: '/Eng_Beee.png',
      branch: 'CSE',
      pdfUrl: '/NotesPDF/temp.pdf',
    },
    {
      name: 'Engineering Graphics',
      Subject_code: 'BT105',
      Sem: '1st',
      description: ' It teaches the basics of technical drawing, including projections, drafting, and visualization of objects.',
      image: '/Eng_Ed.png',
      branch: 'CSE',
      pdfUrl: '/NotesPDF/EDNotes.pdf',
    },
  ];

  const [name, setName] = useState('');
  const [cookies] = useCookies(['bytewiseCookies']);

  // Function to decrypt cookies
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
    const encryptedData = cookies.bytewiseCookies;
    if (encryptedData) {
      const decryptedData = decryptCookie(encryptedData);
      if (decryptedData && decryptedData.status) {
        const fullName = decryptedData.name;
        const firstName = fullName.split(' ')[0];
        const perfectName = firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
        setName(perfectName);
      }
    }

    // Initialize Typed.js
    const options = {
      strings: ['Free Notes', 'Free Courses', 'Affordable Lab Manuals'],
      typeSpeed: 100,
      backSpeed: 50,
      loop: true,
    };

    const typed = new Typed('#HeadingTagline', options);

    // Cleanup Typed.js instance
    return () => {
      typed.destroy();
    };
  }, [cookies]);

  return (
    <div className="landing-page">
      <section className="hero">
        <div className="hero-content">
          <h1 id="heading">Welcome {name},</h1>
          <p id="heading2">
            To ByteWise, We provide you
            <br />
            <span id="HeadingTagline"></span>
          </p>
        </div>
        <div className="hero-image">
          <img className="LandingPageImg" src="/LandingPageimg4.png" alt="Education Illustration" />
        </div>
      </section>
      <section id="products">
        <Product products={notesArray} />
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
