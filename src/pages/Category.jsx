import React, { useState } from 'react';
import { Container, Card, CardContent, Typography, Box, Pagination, Skeleton } from '@mui/material';
import { Link } from 'react-router-dom';
import { useFetchCategoriesQuery } from '../services/categoryApi';

const Category = () => {
  const [page, setPage] = useState(1);
  const itemsPerPage = 12;

  const { data: response, isLoading } = useFetchCategoriesQuery({
    limit: itemsPerPage,
    page: page,
    status: 'Active'
  });

  const categories = response?.data?.categories || [];
  const totalPages = response?.data?.pagination.pages || 0;

  const handlePageChange = (_, value) => {
    setPage(value);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  };

  return (
    <Container maxWidth="xl">
      <Typography variant="h5" sx={{ mt: 4, mb: 3, ml: { xs: 0, sm: 2 }, fontWeight: 'bold' }}>Categories</Typography>
      <Box className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {isLoading ? (
          Array.from({ length: 10 }).map((_, index) => (
            <Card key={index} sx={{ py: { xs: 2, sm: 4 } }}>
              <Skeleton variant="rectangular" width='150px' height='106px' sx={{ mx: 'auto' }} />
              <CardContent sx={{ px: 0, pb: 0, pt: 1 }}>
                <Skeleton variant='text' width='70%' sx={{ mx: 'auto', mt: 2 }} />
              </CardContent>
            </Card>
          ))
        ) : (
          categories.map(category => (
            <Card key={category._id} sx={{ py: { xs: 2, sm: 4 } }}>
              <Link to={`/category/${category._id}`}>
                <img className='w-24 h-24 mx-auto' src={category.image} alt={category.title} />
                <CardContent sx={{ px: 0, pb: 0, pt: 1 }}>
                  <Typography sx={{ fontWeight: 600, mt: 2, textAlign: 'center' }}>
                    {category.title}
                  </Typography>
                </CardContent>
              </Link>
            </Card>
          ))
        )}
      </Box>
      <Box className="flex justify-center mt-4">
        {!isLoading && totalPages > 1 && (
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

export default Category;
