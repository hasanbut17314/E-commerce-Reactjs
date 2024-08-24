import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Button, Typography, Grid, Paper } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useFetchProductByIdQuery } from '../services/productApi';

const ViewProduct = () => {
    const { id } = useParams();
    const { data: response, isLoading } = useFetchProductByIdQuery(id);
    const product = response?.data || {};

    const [zoomStyle, setZoomStyle] = useState({});
    const [showZoom, setShowZoom] = useState(false);

    if (!product) {
        return <Typography variant="h5" color="error">Product not found</Typography>;
    }

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

    return (
        <Box sx={{ p: 3 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
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
                            src={product.image || 'https://via.placeholder.com/400'}
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
                    <Box sx={{ pl: { md: 3 }, pt: { xs: 3, md: 0 } }}>
                        <Typography variant="h5" fontWeight="600" gutterBottom>{product.title}</Typography>
                        <Typography paragraph dangerouslySetInnerHTML={{ __html: product.description }} />
                        <Typography variant="h5" fontWeight="bold" color="primary" gutterBottom>${product.price}</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                            <Typography variant="body1" color="textSecondary">Quantity:</Typography>
                            <Typography variant="body1">{product.quantity}</Typography>
                        </Box>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<AddShoppingCartIcon />}
                            onClick={() => console.log("Product added to cart:", product)}
                            disabled={product.quantity === 0}
                        >
                            {product.quantity > 0 ? 'Add to Cart' : 'Out of Stock'}
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default ViewProduct;
