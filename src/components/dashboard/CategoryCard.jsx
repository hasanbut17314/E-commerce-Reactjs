import React from 'react';
import { Card, CardContent, Typography, CardMedia } from '@mui/material';

const CategoryCard = ({ category }) => {
  return (
    <Card>
      <CardMedia
        component="img"
        height="140"
        image={category.image || 'https://via.placeholder.com/150'}
        alt={category.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
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
