import React from 'react';
import Slider from 'react-slick';
import { Card, CardMedia, CardContent, Typography, Button, Box } from '@mui/material';
import { styled } from '@mui/system';
import { NextArrow, PrevArrow } from './Arrows';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProductCard = styled(Card)(({ theme }) => ({
    margin: '0 auto',
}));

const FeaturedProducts = () => {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 4,
                },
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 785,
                settings: {
                    slidesToShow: 2,
                    dots: false
                },
            },
            {
                breakpoint: 580,
                settings: {
                    slidesToShow: 1,
                    dots: false
                },
            },
        ],
    };

    const products = [
        { id: 1, name: 'Product 1', price: '$100', image: 'https://via.placeholder.com/200', description: 'Short description of product 1' },
        { id: 2, name: 'Product 2', price: '$200', image: 'https://via.placeholder.com/200', description: 'Short description of product 2' },
        { id: 3, name: 'Product 3', price: '$300', image: 'https://via.placeholder.com/200', description: 'Short description of product 3' },
        { id: 4, name: 'Product 4', price: '$400', image: 'https://via.placeholder.com/200', description: 'Short description of product 4' },
        { id: 5, name: 'Product 5', price: '$500', image: 'https://via.placeholder.com/200', description: 'Short description of product 5' },
    ];

    return (
        <Box sx={{ my: 4 }}>
            <Typography variant="h6" gutterBottom>
                Featured Products
            </Typography>
            <Slider {...settings} className='featuredSlider flex justify-center items-center'>
                {products.map((product) => (
                    <ProductCard key={product.id} sx={{ width: { xs: '270px !important', sm: '240px !important' } }}>
                        <CardMedia
                            component="img"
                            image={product.image}
                            alt={product.name}
                        />
                        <CardContent>
                            <Typography variant="h6">{product.name}</Typography>
                            <Typography>{product.price}</Typography>
                            <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                                Buy Now
                            </Button>
                        </CardContent>
                    </ProductCard>
                ))}
            </Slider>
        </Box>
    );
};

export default FeaturedProducts;
