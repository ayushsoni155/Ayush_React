import React from 'react';
import Slider from 'react-slick'; // Import Slider from react-slick
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css"; 
import '../css/Product.css'; // Import the CSS for Product component

const Product = ({ products }) => {
  // Slider settings for the product cards
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true, // Enable autoplay
    autoplaySpeed: 2000, // Set autoplay speed to 2 seconds
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  const scrollToTop = () => {
    window.scrollTo(0, 0);  // Scrolls to the top of the page
  };
  return (
    <div id="productSection" className="product-section">
      <h2 id="productHeading">Notes</h2>
      <Slider {...sliderSettings} className="product-slider">
        {products.map((product, index) => (
         <Link to='/notes' onClick={scrollToTop}><div key={index} className="product-card">
            <img src={product.image} alt={product.name} className="product-image" />
            <div className="product-content">
              <h3 className="product-title">{product.name}</h3>
              <p className="product-description">{product.description}</p>
            </div>
          </div></Link>
        ))}
      </Slider>
      <Link to="/notes">
        <button id='explorebtn' onClick={scrollToTop}>Explore More</button>
      </Link>
    </div>
  );
};

export default Product;
