import React from 'react';
import Slider from 'react-slick';
import { Card, CardMedia, CardContent, Typography, Button, Box, Skeleton } from '@mui/material';
import { useFetchProductsQuery } from '../services/productApi';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProductCard = styled(Card)(({ theme }) => ({
    margin: '0 auto',
}));

const FeaturedProducts = () => {

    const { data: productsData, isLoading } = useFetchProductsQuery({ limit: 5, isFeatured: true });
    const products = productsData?.data?.products || [];

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        arrows: !isLoading,
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
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    dots: false
                },
            },
        ],
    };

    return (
        <Box sx={{ my: 4 }}>
            <Typography variant="h6" sx={{ marginInlineStart: 2, mb: 3 }}>
                Featured Products
            </Typography>
            <Slider {...settings} className='featuredSlider flex justify-center items-center'>
                {isLoading ? (
                    Array.from(new Array(5)).map((_, index) => (
                        <ProductCard key={index} sx={{ width: { xs: '270px !important', sm: '240px !important' } }}>
                            <Skeleton variant="rectangular" width={230} sx={{ margin: '0 auto', height: 230 }} />
                            <CardContent>
                                <Skeleton variant="text" sx={{ fontSize: '1rem', width: '80%' }} />
                                <Skeleton variant="text" sx={{ fontSize: '1.2rem', width: '60%' }} />
                                <Skeleton variant="rectangular" width="100%" height={36} sx={{ mt: 2 }} />
                            </CardContent>
                        </ProductCard>
                    ))
                ) : (
                    products.map((product) => (
                        <ProductCard key={product._id} sx={{ width: { xs: '270px !important', sm: '240px !important' } }}>
                            <CardMedia
                                component="img"
                                image={product.image}
                                alt={product.title}
                                sx={{ width: 230, height: 230, objectFit: 'cover', margin: '0 auto' }}
                            />
                            <CardContent>
                                <Typography
                                    sx={{
                                        fontWeight: 500,
                                        display: '-webkit-box',
                                        WebkitBoxOrient: 'vertical',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        WebkitLineClamp: 2,
                                        maxHeight: '3.2em',
                                        my: 1,
                                    }}
                                >
                                    {product.title}
                                </Typography>
                                <Typography sx={{ mt: 1, fontWeight: 400 }}>${product.price}</Typography>
                                <Link to={`/product/${product._id}`}>
                                    <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                                        Buy Now
                                    </Button>
                                </Link>
                            </CardContent>
                        </ProductCard>
                    ))
                )}
            </Slider>
        </Box>
    );
};

export default FeaturedProducts;
