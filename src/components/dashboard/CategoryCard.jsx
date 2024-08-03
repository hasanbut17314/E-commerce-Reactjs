import React from 'react';
import { Card, CardContent, Typography, CardMedia } from '@mui/material';

const CategoryCard = ({ category }) => {
  return (
    <Card sx={{height: { xs: 250, sm: 'auto' }}}>
      <CardMedia
        component="img"
        image={category.image || 'https://via.placeholder.com/120'}
        alt={category.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {category.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {category.description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CategoryCard;
