import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Paper, Box, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <Container maxWidth="xl" sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#0093E9', backgroundImage: 'linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)' }}>
      <Paper elevation={3} className="p-6 w-[460px]">
        <Typography variant="h5" mb={3} fontWeight={600} className="text-center">
          Register
        </Typography>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            value={form.username}
            onChange={handleChange}
            name="username"
            required
          />
          <TextField
            label="Email"
            variant="outlined"
            name="email"
            fullWidth
            value={form.email}
            onChange={handleChange}
            type='email'
            required
          />
          <TextField
            label="Password"
            variant="outlined"
            name="password"
            fullWidth
            type={showPassword ? 'text' : 'password'}
            value={form.password}
            onChange={handleChange}
            required
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
          <TextField
            label="Confirm Password"
            variant="outlined"
            name="confirmPassword"
            required
            fullWidth
            type={showConfirmPassword ? 'text' : 'password'}
            value={form.confirmPassword}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle confirm password visibility"
                    onClick={toggleConfirmPasswordVisibility}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Box className="flex justify-center mt-6">
            <Button variant="contained" color="primary" type="submit">
              Sign Up
            </Button>
          </Box>
        </form>
        <Typography variant="body2" my={3} className="text-center">
          Already have an account? <Link to="/login" className="text-blue-500">Login here</Link>
        </Typography>
      </Paper>
    </Container>
  );
};

export default Signup;
