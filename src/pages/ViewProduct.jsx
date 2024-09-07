import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Button, Typography, Grid, Paper, Skeleton, CircularProgress } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useFetchProductByIdQuery } from '../services/productApi';
import { useAddToCartMutation } from '../services/cartApi';
import notify from '../utils/notify';

const ViewProduct = () => {
    const { id } = useParams();
    const { data: response, isLoading } = useFetchProductByIdQuery(id);
    const product = response?.data || {};

    const [addToCart, { isLoading: isAddingToCart }] = useAddToCartMutation();

    const [zoomStyle, setZoomStyle] = useState({});
    const [showZoom, setShowZoom] = useState(false);

    const handleMouseMove = (e) => {
        const { left, top, width, height } = e.target.getBoundingClientRect();
        const x = e.clientX - left;
        const y = e.clientY - top;

        const xPercent = (x / width) * 100;
        const yPercent = (y / height) * 100;

        setZoomStyle({
            backgroundPosition: `${xPercent}% ${yPercent}%`,
            top: `${y - 100}px`,
            left: `${x - 20}px`,
        });

        setShowZoom(true);
    };

    const handleMouseLeave = () => {
        setShowZoom(false);
    };

    const handleAddToCart = async () => {
        try {
            const cartData = {
                prod_id: product._id,
                quantity: 1,
            }
            await addToCart(cartData).unwrap();
            notify.success('Product added to cart successfully');
        } catch (err) {
            if(err.originalStatus === 401) {
                notify.error('Please login first');
            } else {
            notify.error('Something went wrong! Product not added to cart');
            }
        }
    }

    if (!product) {
        return <Typography variant="h5" color="error">Product not found</Typography>;
    }

    return (
        <Box sx={{ p: 3 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    {isLoading && (
                        <Skeleton
                            variant="rectangular"
                            width="100%"
                            height="400px"
                            sx={{ borderRadius: '10px' }}
                            animation="wave"
                        />
                    )}
                    <Paper
                        elevation={0}
                        sx={{
                            p: 2,
                            textAlign: 'center',
                            position: 'relative',
                            '&:hover .zoom-lens': { opacity: 1 },
                        }}
                    >
                        <img
                            src={product.image}
                            alt={product.title}
                            style={{ width: '100%', height: 'auto', borderRadius: '10px', maxWidth: '400px', maxHeight: '400px', margin: '0 auto' }}
                            onMouseMove={handleMouseMove}
                            onMouseLeave={handleMouseLeave}
                        />
                        {showZoom && (
                            <Box
                                className="zoom-lens"
                                sx={{
                                    position: 'absolute',
                                    width: '200px',
                                    height: '200px',
                                    border: '1px solid #ddd',
                                    borderRadius: '50%',
                                    backgroundImage: `url(${product.image})`,
                                    backgroundSize: '200%',
                                    pointerEvents: 'none',
                                    zIndex: 10,
                                    opacity: 0,
                                    ...zoomStyle,
                                }}
                            />
                        )}
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    {isLoading ? (
                        <Box sx={{ pl: { md: 3 }, pt: { xs: 3, md: 0 } }}>
                            <Skeleton
                                variant="text"
                                height="65px"
                                width="100%"
                                sx={{ mb: 2 }}
                                animation="pulse"
                            />
                            {Array.from({ length: 10 }).map((_, index) => (
                                <Skeleton
                                    key={index}
                                    variant="text"
                                    width="100%"
                                    sx={{ mb: 2 }}
                                    animation="pulse"
                                />
                            ))}
                        </Box>
                    ) : (
                        <Box sx={{ pl: { md: 3 }, pt: { xs: 3, md: 0 } }}>
                            <Typography variant="h5" fontWeight="600" gutterBottom>{product.title}</Typography>
                            <Typography paragraph dangerouslySetInnerHTML={{ __html: product.description }} />
                            <Typography variant="h5" fontWeight="bold" color="primary" gutterBottom>${product.price}</Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                                <Typography variant="body1" color="textSecondary">Quantity:</Typography>
                                <Typography variant="body1">{product.quantity}</Typography>
                            </Box>
                            {product.quantity === 0 ? ( 
                                <Button
                                variant="contained"
                                color="primary"
                                startIcon={<AddShoppingCartIcon />}
                                disabled
                            >
                                Out of Stock
                            </Button>
                            ) : (
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={isAddingToCart ? <CircularProgress size={24} /> : <AddShoppingCartIcon />}
                                onClick={handleAddToCart}
                                disabled={isAddingToCart}
                            >
                                {isAddingToCart ? 'Adding...' : 'Add to Cart'}
                            </Button>
                            )}
                        </Box>
                    )}
                </Grid>
            </Grid>
        </Box>
    );
};

export default ViewProduct;
