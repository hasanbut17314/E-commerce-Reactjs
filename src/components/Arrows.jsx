import React from 'react';
import { IconButton } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { styled } from '@mui/system';

const ArrowButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: 'rgba(128, 128, 128, 0.5)',
  '&:hover': {
    backgroundColor: 'rgba(128, 128, 128, 0.7)',
  },
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  zIndex: 1,
  borderRadius: '50%',
  color: '#fff',
}));

export const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <ArrowButton
      className={className}
      style={{ ...style, right: -18 }}
      onClick={onClick}
    >
      <ArrowForwardIos />
    </ArrowButton>
  );
};

export const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <ArrowButton
      className={className}
      style={{ ...style, left: -18 }}
      onClick={onClick}
    >
      <ArrowBackIos />
    </ArrowButton>
  );
};
