import React from 'react';
import { Container, Card, CardMedia, CardContent, Typography, Box, Button, Pagination } from '@mui/material';

const dummyProducts = [
  { id: 1, name: 'Product 1', price: '$100', image: 'https://via.placeholder.com/200' },
  { id: 2, name: 'Product 2', price: '$200', image: 'https://via.placeholder.com/200' },
  { id: 3, name: 'Product 3', price: '$300', image: 'https://via.placeholder.com/200' },
  { id: 4, name: 'Product 4', price: '$400', image: 'https://via.placeholder.com/200' },
  { id: 5, name: 'Product 5', price: '$500', image: 'https://via.placeholder.com/200' },
  { id: 6, name: 'Product 6', price: '$600', image: 'https://via.placeholder.com/200' },
  { id: 7, name: 'Product 7', price: '$700', image: 'https://via.placeholder.com/200' },
  { id: 8, name: 'Product 8', price: '$800', image: 'https://via.placeholder.com/200' },
];

const Products = () => {
  const [page, setPage] = React.useState(1);
  const itemsPerPage = 5;

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const paginatedProducts = dummyProducts.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <Container maxWidth="xl">
      <Typography variant="h5" sx={{ mt: 4, mb: 2, ml: { xs: 0, sm: 2 }, fontWeight: 'bold' }}>Products</Typography>
      <Box className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
        {paginatedProducts.map(product => (
          <Card key={product.id} className="max-w-sm mx-auto">
            <CardMedia
              component="img"
              image={product.image}
              alt={product.name}
              sx={{ width: 230, height: { xs: 170, sm: 230 }, objectFit: 'cover', margin: '0 auto' }}
            />
            <CardContent>
              <Typography variant="h6">{product.name}</Typography>
              <Typography variant="body1" sx={{ marginBottom: 2 }}>{product.price}</Typography>
              <Button variant="contained" color="primary">Buy Now</Button>
            </CardContent>
          </Card>
        ))}
      </Box>
      <Box className="flex justify-center mt-4">
        <Pagination
          count={Math.ceil(dummyProducts.length / itemsPerPage)}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Container>
  );
};

export default Products;
