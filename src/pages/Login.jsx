import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Paper, Box, IconButton, InputAdornment } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({
    usernameOrEmail: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(form);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} className="p-6 mt-10">
        <Typography variant="h5" className="mb-6 text-center">
          Login
        </Typography>
        <Box className="flex justify-between mb-6">
          <Button
            variant="contained"
            fullWidth
            color="secondary"
            startIcon={<GoogleIcon />}
            className="mr-2"
            onClick={() => console.log('Login with Google')}
            style={{ backgroundColor: '#DB4437', color: '#FFFFFF' }}
          >
            Google
          </Button>
          <Button
            variant="contained"
            fullWidth
            color="primary"
            startIcon={<FacebookIcon />}
            onClick={() => console.log('Login with Facebook')}
            style={{ backgroundColor: '#4267B2', color: '#FFFFFF' }}
          >
            Facebook
          </Button>
        </Box>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <TextField
            label="Username or Email"
            variant="outlined"
            fullWidth
            name="usernameOrEmail"
            value={form.usernameOrEmail}
            onChange={handleChange}
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={form.password}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={togglePasswordVisibility}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Box className="flex justify-center mt-6">
            <Button variant="contained" color="primary" type="submit">
              Login
            </Button>
          </Box>
        </form>
        <Typography variant="body2" className="mt-4 text-center">
          Don't have an account? <Link to="/signup" className="text-blue-500">Register here</Link>
        </Typography>
      </Paper>
    </Container>
  );
};

export default Login;
