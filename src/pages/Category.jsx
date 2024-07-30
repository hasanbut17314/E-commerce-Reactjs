import React from 'react';
import { Container, Card, CardMedia, CardContent, Typography, Box, Pagination } from '@mui/material';
import { Link } from 'react-router-dom';

const dummyCategories = [
  { id: 1, name: 'Category 1', image: 'https://via.placeholder.com/200' },
  { id: 2, name: 'Category 2', image: 'https://via.placeholder.com/200' },
  { id: 3, name: 'Category 3', image: 'https://via.placeholder.com/200' },
  { id: 4, name: 'Category 4', image: 'https://via.placeholder.com/200' },
  { id: 5, name: 'Category 5', image: 'https://via.placeholder.com/200' },
  { id: 6, name: 'Category 6', image: 'https://via.placeholder.com/200' },
  { id: 7, name: 'Category 7', image: 'https://via.placeholder.com/200' },
  { id: 8, name: 'Category 8', image: 'https://via.placeholder.com/200' },
  { id: 9, name: 'Category 9', image: 'https://via.placeholder.com/200' },
  { id: 10, name: 'Category 10', image: 'https://via.placeholder.com/200' },
  { id: 11, name: 'Category 11', image: 'https://via.placeholder.com/200' },
  { id: 12, name: 'Category 12', image: 'https://via.placeholder.com/200' },
];

const Category = () => {
  const [page, setPage] = React.useState(1);
  const itemsPerPage = 5;

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const paginatedCategories = dummyCategories.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <Container maxWidth="xl">
      <Typography variant="h5" sx={{ mt: 4, mb: 2, ml: { xs: 0, sm: 2 }, fontWeight: 'bold' }}>Categories</Typography>
      <Box className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
        {paginatedCategories.map(category => (
          <Card key={category.id} className="max-w-sm mx-auto">
            <Link to={`/category/${category.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <CardMedia
                component="img"
                image={category.image}
                alt={category.name}
                sx={{ width: 230, height: { xs: 170, sm: 230 }, objectFit: 'cover', margin: '0 auto' }}
              />
              <CardContent>
                <Typography variant="h6">{category.name}</Typography>
              </CardContent>
            </Link>
          </Card>
        ))}
      </Box>
      <Box className="flex justify-center mt-4">
        <Pagination
          count={Math.ceil(dummyCategories.length / itemsPerPage)}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Container>
  );
};

export default Category;
