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
const App = () => {
  return (
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
        
      </Routes>
      <Footer/>
    </Router>
  );
};

export default App;
