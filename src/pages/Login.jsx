import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Paper, Box, IconButton, InputAdornment, Divider, CircularProgress } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../services/authApi';
import notify from '../utils/notify';

const Login = () => {
  const [form, setForm] = useState({
    userEmail: '',
    password: '',
  });

  const navigate = useNavigate();
  const [loginError, setLoginError] = useState('');
  const [login, { isLoading, error }] = useLoginMutation();

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
    setLoginError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.userEmail || !form.password) {
      setLoginError('Please fill in all fields');
      return;
    }

    try {
      const response = await login(form).unwrap();
      const data = response.data;
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      localStorage.setItem('user', JSON.stringify(data.user));
      notify.success('Login successful');

      if (data.user.role === 'admin') {
        navigate('/dashboard');
      } else {
        navigate('/');
      }

    } catch (err) {
      if (err.originalStatus === 402) {
        notify.error('Please verify your email first');
      } else {
        setLoginError(err.message || 'Invalid username or password');
      }
    }
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
            name="userEmail"
            value={form.userEmail}
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
          {loginError && <Typography variant="body2" color="error">{loginError}</Typography>}
          <Box className="flex justify-center mt-3">
            <Button variant="contained" disabled={isLoading} color="primary" type="submit" startIcon={isLoading ? <CircularProgress size={22} /> : null}>
              {isLoading ? 'Loading' : 'Login'}
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
