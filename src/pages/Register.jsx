import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Paper, Box, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useSignupMutation } from '../services/authApi';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [fieldError, setFieldError] = useState('');

  const [signup, { isLoading, isSuccess, isError, error }] = useSignupMutation();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
    setFieldError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(form.password !== form.confirmPassword) {
      setFieldError('Passwords do not match');
      form.password = '';
      form.confirmPassword = '';
      return;
    }
    try {
      await signup(form).unwrap();
      if(isSuccess) {
        toast.success('Account created successfully');
      }
      setForm({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
      })
      setTimeout(() => {
        navigate('/login');
      }, 2500)
    } catch (error) {
      if (error.data) {
        const err = error.data.non_field_errors;
        const errMsg = Array.isArray(err) ? err.join(', ') : err;
        toast.error(errMsg);
      } else {
        toast.error('Something went wrong')
      }
    }
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
          {fieldError && <Typography variant="body2" color="error">{fieldError}</Typography>}
          <Box className="flex justify-center mt-6">
            <Button variant="contained" color="primary" disabled={isLoading} type="submit">
              {isLoading ? 'Loading...' : 'Sign Up'}
            </Button>
          </Box>
        </form>
        <Typography variant="body2" my={3} className="text-center">
          Already have an account? <Link to="/login" className="text-blue-500">Login here</Link>
        </Typography>
        <ToastContainer 
        autoClose={3000} 
        position="bottom-center"
        hideProgressBar={true}
        />
      </Paper>
    </Container>
  );
};

export default Signup;
