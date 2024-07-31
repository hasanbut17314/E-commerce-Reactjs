import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Paper, Box, IconButton, InputAdornment, Divider } from '@mui/material';
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
    <Container maxWidth="xl" sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#0093E9', backgroundImage: 'linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)' }}>
      <Paper elevation={3} className="p-6 w-[460px]">
        <Typography variant="h5" mb={2} className="text-center" fontWeight={600}>
          Login
        </Typography>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <TextField
            label="Username or Email"
            variant="outlined"
            required
            fullWidth
            name="usernameOrEmail"
            value={form.usernameOrEmail}
            onChange={handleChange}
          />
          <TextField
            label="Password"
            variant="outlined"
            required
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
          <Box className="flex justify-center mt-3">
            <Button variant="contained" color="primary" type="submit">
              Login
            </Button>
          </Box>
        </form>
        <Divider sx={{ my: 3 }} />
        <Box>
          <Button
            variant="outlined"
            fullWidth
            color='warning'
            startIcon={<GoogleIcon />}
            onClick={() => console.log('Login with Google')}
            sx={{ mb: 1 }}
          >
            Login with Google
          </Button>
          <Button
            variant="outlined"
            fullWidth
            color="primary"
            startIcon={<FacebookIcon />}
            onClick={() => console.log('Login with Facebook')}
            sx={{ mt: 0.5 }}
          >
            Login with Facebook
          </Button>
        </Box>
        <Typography variant="body2" mt={3} className="text-center">
          Don't have an account? <Link to="/signup" className="text-blue-500">Register here</Link>
        </Typography>
      </Paper>
    </Container>
  );
};

export default Login;
