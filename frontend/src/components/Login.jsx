import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  IconButton,
  InputAdornment
} from '@mui/material';
import { styled } from '@mui/system';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const FormContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  }
}));

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '' });

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleEmailChange = (e) => {
    const email = e.target.value;
    setEmail(email);
    setErrors((prevErrors) => ({
      ...prevErrors,
      email: email ? (validateEmail(email) ? '' : 'Invalid email format') : 'Email is required'
    }));
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setPassword(password);
    setErrors((prevErrors) => ({
      ...prevErrors,
      password: password ? '' : 'Password is required'
    }));
  };

  const validateForm = () => {
    let emailError = '';
    let passwordError = '';

    if (!email) {
      emailError = 'Email is required';
    } else if (!validateEmail(email)) {
      emailError = 'Invalid email format';
    }

    if (!password) {
      passwordError = 'Password is required';
    }

    setErrors({ email: emailError, password: passwordError });

    return !emailError && !passwordError;
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = () => {
    if (validateForm()) {
      // Proceed with login
      console.log('Logging in:', { email, password });
    }
  };

  return (
    <Container maxWidth={isSmallScreen ? 'sm' : 'xs'}>
      <FormContainer>
        <Typography variant="h4" component="h1" gutterBottom>
          Login
        </Typography>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={handleEmailChange}
          error={!!errors.email}
          helperText={errors.email}
        />
        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          margin="normal"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={handlePasswordChange}
          error={!!errors.password}
          helperText={errors.password}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleLogin}
          sx={{ marginTop: '20px' }}
        >
          Login
        </Button>
      </FormContainer>
    </Container>
  );
};

export default LoginPage;
