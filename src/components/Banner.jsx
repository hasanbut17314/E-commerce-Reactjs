import React from 'react';
import Slider from "react-slick";
import { Box, Typography, Container } from '@mui/material';
import { styled } from '@mui/system';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import banner1 from '../assets/banner1.jpg';
import banner2 from '../assets/banner2.jpg';
import banner3 from '../assets/banner3.jpg';

const BannerWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  height: '450px',
  color: '#fff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
}));

const BannerContent = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  flexDirection: 'column',
  padding: theme.spacing(3),
}));

const Banner = () => {
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const banners = [
    {
      image: banner2,
      title: 'Welcome to Our Store',
      description: 'Find the best products here',
    },
    {
      image: banner1,
      title: 'Amazing Discounts',
      description: 'Up to 50% off on selected items',
    },
    {
      image: banner3,
      title: 'New Arrivals',
      description: 'Check out the latest collection',
    },
  ];

  return (
    <Slider {...settings} className='hero-slider'>
      {banners.map((banner, index) => (
        <BannerWrapper key={index} sx={{ backgroundImage: `url(${banner.image})` }}>
          <BannerContent>
            <Typography variant="h3">{banner.title}</Typography>
            <Typography variant="h6">{banner.description}</Typography>
          </BannerContent>
        </BannerWrapper>
      ))}
    </Slider>
  );
};

export default Banner;
