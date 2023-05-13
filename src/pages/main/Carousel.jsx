import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import slide1 from '../../images/carImage/slide1.jpg'
import slide2 from '../../images/carImage/slide2.jpg'
import slide3 from '../../images/carImage/slide3.jpg'

function Carousel() {
    const settings = {
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2500,
        pauseOnHover: true
    }
  return (
    <CarBg>
      <CarP>이벤트</CarP>
      <Slider {...settings}>
        <CarBox car='slide1'></CarBox>
        <CarBox car='slide2'></CarBox>
        <CarBox car='slide3'></CarBox>
      </Slider>
    </CarBg>
  );
}

export default Carousel;

const CarBg = styled.div`
  width: 60%;
  height: 300px;
  margin-top: 50px;
  position: relative;
  overflow: hidden;
`;

const CarP = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
`;

const CarBox = styled.div`
  width: 100%;
  height: 180px;
  display: flex;
  background-image: url(${props => props.car === 'slide1' ? `${slide1}` : (props => props.car === 'slide2' ? `${slide2}` : `${slide3}`)});
  background-position: center;
  background-size: cover
`;
