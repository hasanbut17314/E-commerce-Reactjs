import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Button, Typography, Grid, Paper, IconButton } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import products from '../dummyProducts'; 

const ViewProduct = () => {
    const { id } = useParams();
    const product = products.find(p => p.id === parseInt(id));

    if (!product) {
        return <Typography variant="h5" color="error">Product not found</Typography>;
    }

    const addToCart = () => {
        // Logic to add product to cart
        console.log("Product added to cart:", product);
    };

    return (
        <Box sx={{ p: 3 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{ p: 2, textAlign: 'center' }}>
                        <img
                            src={product.image || 'https://via.placeholder.com/400'}
                            alt={product.title}
                            style={{ width: '100%', height: 'auto', borderRadius: '10px' }}
                        />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box sx={{ pl: { md: 3 }, pt: { xs: 3, md: 0 } }}>
                        <Typography variant="h4" fontWeight="bold" gutterBottom>{product.title}</Typography>
                        <Typography variant="body1" color="textSecondary" paragraph>{product.description}</Typography>
                        <Typography variant="h5" fontWeight="bold" color="primary" gutterBottom>${product.price.toFixed(2)}</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                            <Typography variant="body1" color="textSecondary">Quantity:</Typography>
                            <Typography variant="body1">{product.quantity}</Typography>
                        </Box>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<AddShoppingCartIcon />}
                            onClick={addToCart}
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
