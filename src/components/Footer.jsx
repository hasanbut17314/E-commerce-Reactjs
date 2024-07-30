import React from 'react';
import { Container, Grid, Typography, Box, Link, IconButton, useTheme } from '@mui/material';
import { styled } from '@mui/system';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';

const FooterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(6, 0),
  marginTop: theme.spacing(6),
}));

const FooterTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  fontWeight: 'bold',
}));

const FooterLink = styled(Link)(({ theme }) => ({
  display: 'block',
  marginBottom: theme.spacing(1),
  color: theme.palette.text.secondary,
  textDecoration: 'none',
  '&:hover': {
    color: theme.palette.primary.main,
  },
}));

const SocialMediaIcons = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  marginTop: theme.spacing(2),
}));

const Footer = () => {
  const theme = useTheme();

  return (
    <FooterContainer theme={theme}>
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <FooterTitle variant="h6" theme={theme}>Contact Us</FooterTitle>
            <Typography variant="body2" color="textSecondary">
              123 E-commerce St.<br />
              Commerce City, EC 12345<br />
              Email: support@example.com<br />
              Phone: (123) 456-7890
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <FooterTitle variant="h6" theme={theme}>Quick Links</FooterTitle>
            <FooterLink href="/" theme={theme}>Home</FooterLink>
            <FooterLink href="/about" theme={theme}>About Us</FooterLink>
            <FooterLink href="/categories" theme={theme}>Categories</FooterLink>
            <FooterLink href="/products" theme={theme}>Products</FooterLink>
            <FooterLink href="/contact" theme={theme}>Contact Us</FooterLink>
          </Grid>
          <Grid item xs={12} md={4}>
            <FooterTitle variant="h6" theme={theme}>Follow Us</FooterTitle>
            <Typography variant="body2" color="textSecondary">
              Stay connected with us through social networks!
            </Typography>
            <SocialMediaIcons theme={theme}>
              <IconButton href="https://www.facebook.com" target="_blank" color="inherit">
                <Facebook />
              </IconButton>
              <IconButton href="https://www.twitter.com" target="_blank" color="inherit">
                <Twitter />
              </IconButton>
              <IconButton href="https://www.instagram.com" target="_blank" color="inherit">
                <Instagram />
              </IconButton>
              <IconButton href="https://www.linkedin.com" target="_blank" color="inherit">
                <LinkedIn />
              </IconButton>
            </SocialMediaIcons>
          </Grid>
        </Grid>
        <Box mt={4} textAlign="center">
          <Typography variant="body2" color="textSecondary">
            &copy; {new Date().getFullYear()} Martyz Store. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </FooterContainer>
  );
};

export default Footer;
