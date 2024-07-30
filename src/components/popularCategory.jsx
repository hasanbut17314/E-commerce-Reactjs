import React from 'react';
import { Card, CardContent, Typography, Box, Container, Grid } from '@mui/material';
import { styled } from '@mui/system';

// Dummy SVG for category image
const CategoryImage = styled('div')(({ theme }) => ({
  width: 100,
  height: 100,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto 16px',
  svg: {
    width: '50%',
    height: '50%',
    fill: theme.palette.primary,
  },
}));

const categories = [
  { id: 1, name: 'Category 1' },
  { id: 2, name: 'Category 2' },
  { id: 3, name: 'Category 3' },
  { id: 4, name: 'Category 4' },
  { id: 5, name: 'Category 5' },
];

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
  return (
    <Box sx={{ mb: 4, mt: 8 }}>
        <Typography variant="h6" gutterBottom sx={{ marginInlineStart: 2 }}>
          Popular Categories
        </Typography>
        <Grid container spacing={3}>
          {categories.map((category) => (
            <Grid item key={category.id} xs={6} sm={3.4} md={3.4} lg={2.4}>
              <CategoryCard>
                <CategoryImage>
                  <svg viewBox="0 0 24 24">
                    <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm-1 14.93V11H8l4-4 4 4h-3v5.93a8.12 8.12 0 0 1-2 0z"/>
                  </svg>
                </CategoryImage>
                <CardContent>
                  <Typography variant='h6'>{category.name}</Typography>
                </CardContent>
              </CategoryCard>
            </Grid>
          ))}
        </Grid>
    </Box>
  );
};

export default PopularCategories;
