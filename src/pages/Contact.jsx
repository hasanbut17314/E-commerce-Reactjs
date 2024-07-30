import React from 'react';
import { Container, Typography, Box, TextField, Button, Grid, Paper } from '@mui/material';
import { LocationOn, Phone, Email } from '@mui/icons-material';

const Contact = () => {
  return (
    <Container maxWidth="md" sx={{ paddingX: { xs: 2, sm: 4 }, pt: { xs: 5, sm: 8 } }}>
      <Typography variant="h5" gutterBottom fontWeight={500}>Contact Us</Typography>
      <Typography variant="body1" paragraph>
        If you have any questions or need assistance, please feel free to reach out to us. We're here to help!
      </Typography>
      <Box component="form" sx={{ marginTop: 3, '& .MuiTextField-root': { marginBottom: 2 } }}>
        <TextField
          variant="outlined"
          fullWidth
          label="Your Name"
          required
        />
        <TextField
          variant="outlined"
          fullWidth
          label="Your Email"
          type="email"
          required
        />
        <TextField
          variant="outlined"
          fullWidth
          label="Subject"
          required
        />
        <TextField
          variant="outlined"
          fullWidth
          label="Message"
          multiline
          rows={4}
          required
        />
        <Button variant="contained" color="primary" type="submit">Send Message</Button>
      </Box>
      <Paper sx={{ padding: 4, marginTop: 4 }}>
        <Typography variant="h5" gutterBottom>Contact Information</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
              <LocationOn sx={{ marginRight: 1, color: 'primary.main' }} />
              <Typography variant="body1">123 E-commerce St., Commerce City, EC 12345</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
              <Phone sx={{ marginRight: 1, color: 'primary.main' }} />
              <Typography variant="body1">(123) 456-7890</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
              <Email sx={{ marginRight: 1, color: 'primary.main' }} />
              <Typography variant="body1">support@example.com</Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Contact;
