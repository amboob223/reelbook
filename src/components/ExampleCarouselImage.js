import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import "bootstrap/dist/css/bootstrap.min.css";
import img1 from "../images/rap.png";
import img2 from "../images/con.png";
import img3 from "../images/mov.png";
import "../App.css"; // Import your custom CSS file

function CarouselFadeExample() {
  return (
    <Carousel fade>
      <Carousel.Item>
        <img
          className='pic'
          src={img3}
          alt="first"
          width="300px" // Adjust width of image
        />
        <Carousel.Caption className="carousel-caption-bottom"> {/* Add custom class for styling */}
          <h3 className="caption-text">cinematography</h3> {/* Add custom class for styling */}
          <p className="caption-text">Got a Big Movie Idea? we can get you started. </p> {/* Add custom class for styling */}
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className='pic'
          src={img2}
          alt="two"
          width="300px" // Adjust width of image
        />
        <Carousel.Caption className="carousel-caption-bottom"> {/* Add custom class for styling */}
          <h3 className="caption-text">contentMarketing</h3> {/* Add custom class for styling */}
          <p className="caption-text">Got an idea you want people to see. We can shoot all your content</p> {/* Add custom class for styling */}
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className='pic'
          src={img1}
          alt="first"
          width="300px" // Adjust width of image
        />
        <Carousel.Caption className="carousel-caption-bottom"> {/* Add custom class for styling */}
          <h3 className="caption-text">Music Videos</h3> {/* Add custom class for styling */}
          <p className="caption-text">Need a music video shot? Book with us now.</p> {/* Add custom class for styling */}
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselFadeExample;
