import React from 'react';
import { Container, Typography, Box, Grid, Card, CardContent, Avatar } from '@mui/material';
import Newsletter from '../components/Newsletter';

const About = () => {
  const teamMembers = [
    {
      id: 1,
      name: 'John Doe',
      role: 'CEO',
      image: 'https://plus.unsplash.com/premium_photo-1664536392896-cd1743f9c02c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8fDB8fHww'
    },
    {
      id: 2,
      name: 'Michael Smith',
      role: 'CTO',
      image: 'https://plus.unsplash.com/premium_photo-1675130119373-61ada6685d63?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cGVyc29ufGVufDB8fDB8fHww'
    },
    {
      id: 3,
      name: 'Jane Doe',
      role: 'COO',
      image: 'https://images.unsplash.com/photo-1445053023192-8d45cb66099d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cGVyc29ufGVufDB8fDB8fHww'
    },
    {
      id: 4,
      name: 'James Brown',
      role: 'CFO',
      image: 'https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D'
    }
  ];

  return (
    <>
    <Box sx={{ paddingX: { xs: 2, sm: 6 }, pt: 6, backgroundColor: 'background.default' }}>
      <Container>
        <Box sx={{ marginBottom: (theme) => theme.spacing(6) }}>
          <Typography variant="h5" gutterBottom>About Us</Typography>
          <Typography variant="body1">
            Welcome to Our E-commerce Store! We are dedicated to providing you with the best products and services.
            Our team works hard to ensure your shopping experience is seamless and enjoyable.
          </Typography>
        </Box>
        <Box sx={{ marginBottom: (theme) => theme.spacing(6) }}>
          <Typography variant="h5" gutterBottom>Our Mission</Typography>
          <Typography variant="body1">
            Our mission is to offer high-quality products at affordable prices while maintaining exceptional customer service.
            We aim to create a positive impact on our customers, employees, and the community.
          </Typography>
        </Box>
        <Box sx={{ marginBottom: (theme) => theme.spacing(6) }}>
          <Typography variant="h5" gutterBottom>Meet Our Team</Typography>
          <Grid container spacing={4}>
            {teamMembers.map((member) => (
              <Grid item xs={12} sm={6} md={3} key={member.id}>
                <Card sx={{ textAlign: 'center', boxShadow: 3, borderRadius: 2, padding: 2 }}>
                  <Avatar sx={{ width: 80, height: 80, margin: '0 auto 16px' }} src={member.image} />
                  <CardContent>
                    <Typography variant="h6">{member.name}</Typography>
                    <Typography variant="body2" color="textSecondary">{member.role}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box sx={{ marginBottom: (theme) => theme.spacing(6) }}>
          <Typography variant="h5" gutterBottom>Contact Us</Typography>
          <Typography variant="body1">
            If you have any questions or need assistance, please feel free to contact us at:
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Email: support@example.com<br />
            Phone: (123) 456-7890<br />
            Address: 123 E-commerce St., Commerce City, EC 12345
          </Typography>
        </Box>
      </Container>
    </Box>
    <Newsletter />
    </>
  );
};

export default About;
