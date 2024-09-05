import React, { useState } from 'react';
import { Container, Card, CardMedia, CardContent, Typography, Box, Button, Pagination, Skeleton } from '@mui/material';
import { Link } from 'react-router-dom';
import { useFetchProductsQuery } from '../services/productApi';

// TODO: Review about products status


const Products = () => {
  const [page, setPage] = useState(1);
  const itemsPerPage = 12;

  const handlePageChange = (_, value) => {
    setPage(value);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const { data: response, isLoading } = useFetchProductsQuery({
    page: page,
    limit: itemsPerPage,
  });

  const products = response?.data?.products || [];
  const totalPages = response?.data?.pagination.pages;

  const skeletonArray = Array.from(new Array(itemsPerPage));

  return (
    <Container maxWidth="xl">
      <Typography variant="h5" sx={{ mt: 4, mb: 2, ml: { xs: 0, sm: 2 }, fontWeight: 'bold' }}>Products</Typography>
      <Box className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-3 gap-y-8">
        {isLoading ? (
          skeletonArray.map((_, index) => (
            <Card
              key={index}
              className="max-w-sm mx-auto"
              sx={{ width: { xs: '100%', sm: '80%', md: '90%', lg: '100%' }, margin: 'auto' }}
            >
              <Skeleton
                variant="rectangular"
                sx={{
                  width: { xs: '100%', sm: 230 },
                  height: { xs: 170, sm: 230 },
                  mx: 'auto',
                }}
              />
              <CardContent>
                <Skeleton variant="text" />
                <Skeleton variant="text" width="60%" />
                <Skeleton variant="rectangular" height={36} width="100%" sx={{ mt: 2 }} />
              </CardContent>
            </Card>
          ))
        ) : (
          products.map((product) => (
            <Card
              key={product._id}
              className="max-w-sm mx-auto"
              sx={{ width: { xs: '100%', sm: '80%', md: '90%', lg: '100%' }, margin: 'auto' }}
            >
              <CardMedia
                component="img"
                image={product.image}
                alt={product.title}
                sx={{ width: 230, height: { xs: 170, sm: 230 }, objectFit: 'cover', margin: '0 auto' }}
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
                    fontSize: { xs: '0.8rem', sm: '1rem' },
                  }}
                >
                  {product.title}
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: 2 }}>${product.price}</Typography>
                <Link to={`/product/${product._id}`}>
                  <Button variant="contained" color="primary">Buy Now</Button>
                </Link>
              </CardContent>
            </Card>
          ))
        )}
      </Box>
      <Box className="flex justify-center mt-4">
        {!isLoading && (
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
          />
        )}
      </Box>
    </Container>
  );
};

export default Products;
