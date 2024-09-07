import React from 'react';
import { Card, CardContent, Typography, Box, Grid, Skeleton } from '@mui/material';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom';
import { useFetchCategoriesQuery } from '../services/categoryApi';

const CategoryCard = styled(Card)(({ theme }) => ({
  textAlign: 'center',
  maxWidth: 200,
  margin: 'auto',
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(2),
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1),
  },
}));

const PopularCategories = () => {
  const { data: response, isLoading } = useFetchCategoriesQuery({ limit: 5 });
  const categories = response?.data?.categories || [];

  return (
    <Box sx={{ mb: 2, mt: 8 }}>
      <Typography variant="h6" sx={{ marginInlineStart: 2, mb: 3 }}>
        Popular Categories
      </Typography>
      <Grid container spacing={3}>
        {isLoading ? (
          [...Array(5)].map((_, index) => (
            <Grid item key={index} xs={6} sm={3.4} md={3.4} lg={2.4}>
              <CategoryCard sx={{ height: '215px' }}>
                <Skeleton variant="rectangular" width={96} height={96} sx={{ mx: 'auto', mt: 2 }} />
                <CardContent sx={{ px: 0, pb: 0, pt: 1 }}>
                  <Skeleton width="60%" sx={{ mx: 'auto' }} />
                </CardContent>
              </CategoryCard>
            </Grid>
          ))
        ) : (
          categories.map((category) => (
            <Grid item key={category._id} xs={6} sm={3.4} md={3.4} lg={2.4}>
              <Link to={`/category/${category._id}`}>
                <CategoryCard sx={{ height: '215px' }}>
                  <img className='w-24 h-24 mx-auto' src={category.image} alt={category.title} />
                  <CardContent sx={{ px: 0, pb: 0, pt: 1 }}>
                    <Typography sx={{ fontWeight: 600, mt: 2 }}>
                      {category.title}
                    </Typography>
                  </CardContent>
                </CategoryCard>
              </Link>
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
};

export default PopularCategories;
