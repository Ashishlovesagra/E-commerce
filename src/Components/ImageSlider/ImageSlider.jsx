import React, { useEffect, useState } from 'react';
import "./Style.css";


const ImageSlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((currentIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className='homeImageSliderBox'>
      <img className='sliderImages' src={images[currentIndex]} alt={`Image ${currentIndex}`} />
    </div>
  );
};

export default ImageSlider;
