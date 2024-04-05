import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AutoSlideCarousel = ({ interval, images }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    }, interval);
    return () => clearInterval(intervalId);
  }, [interval, images.length]);

  return (
    <Carousel activeIndex={index} onSelect={(selectedIndex) => setIndex(selectedIndex)} controls={false}>
      {images.map((image, idx) => (
        <Carousel.Item key={idx}>
         <Link><img
            className="d-block w-100"
            src={image}
            alt={`Slide ${idx + 1}`}
          /></Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default AutoSlideCarousel;
