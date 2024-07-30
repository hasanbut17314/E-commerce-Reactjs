import React from 'react';
import { Container, Typography, TextField, Button, Box, useTheme } from '@mui/material';
import { Email } from '@mui/icons-material';
import { styled } from '@mui/system';

const NewsletterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(4),
  textAlign: 'center',
  borderRadius: theme.shape.borderRadius,
  marginTop: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

const NewsletterIcon = styled(Email)(({ theme }) => ({
  fontSize: '3rem',
  marginBottom: theme.spacing(2),
  color: theme.palette.primary.main,
}));

const NewsletterTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.5rem',
  },
}));

const NewsletterDescription = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  [theme.breakpoints.down('sm')]: {
    fontSize: '1rem',
  },
}));

const NewsletterForm = styled('form')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  [theme.breakpoints.up('sm')]: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
}));

const NewsletterTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    marginBottom: 0,
    marginRight: theme.spacing(2),
  },
}));

const NewsletterButton = styled(Button)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    height: '55px',
  },
}));

const Newsletter = () => {
  const theme = useTheme();

  return (
    <Container sx={{ mt: { xs: 8, sm: 12 }, mb: 4 }}>
      <NewsletterContainer theme={theme}>
        <NewsletterIcon theme={theme} />
        <NewsletterTitle variant="h4" theme={theme}>Subscribe to Our Newsletter</NewsletterTitle>
        <NewsletterDescription variant="body1" theme={theme}>
          Get the latest updates and offers.
        </NewsletterDescription>
        <NewsletterForm theme={theme}>
          <NewsletterTextField
            label="Your Email"
            variant="outlined"
            fullWidth
            theme={theme}
          />
          <NewsletterButton variant="contained" color="primary" theme={theme}>
            Subscribe
          </NewsletterButton>
        </NewsletterForm>
      </NewsletterContainer>
    </Container>
  );
};

export default Newsletter;
