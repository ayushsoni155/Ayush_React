import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './component/jsx/Header';
import Notes from './component/jsx/Notes';
import LandingPage from './component/jsx/LandingPage';
import BuyLabManual from './component/jsx/BuyLabManual';
import Footer from './component/jsx/Footer';
import Cart from './component/jsx/Cart';
import Signup from './component/jsx/Signup';
import Login from './component/jsx/Login';
import Profile from './component/jsx/Profile';
import ForgotPassword from './component/jsx/ForgetPassword';
import ResetPassword from './component/jsx/ResetPassword';
import Feedback from './component/jsx/Feedback';
import CourseSection from './component/jsx/CourseSection';
import TermsAndConditions from './component/jsx/TermsAndConditions';
import PrivacyPolicy from './component/jsx/PrivacyPolicy';
import ErrorBoundary from './component/jsx/ErrorBoundary';
import Error404 from "./component/jsx/Error404";


const App = () => {
  return (
   <ErrorBoundary>
    <Router>
         
      <Header />  {/* Header will stay on all pages */}
      
      <Routes>

        <Route path="/" element={<LandingPage />} />       {/* Home route */}
        <Route path="/notes" element={<Notes />} /> {/* Notes route */}
        <Route path="/Lab-Manuals" element={<BuyLabManual />}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/Signup' element={<Signup/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/forgot-password' element={<ForgotPassword/>}/>
        <Route path='/reset-password' element={<ResetPassword/>}/>
        <Route path='/courses' element={<CourseSection/>}/>
        <Route path='/t&c' element={<TermsAndConditions/>}/>
        <Route path='/PrivacyPolicy' element={<PrivacyPolicy/>}/>
        <Route path="*" element={<Error404 />} />
        
      </Routes>
      <Feedback/>
      <Footer/>
    
    </Router>
   </ErrorBoundary>
  
  );
};

export default App;
