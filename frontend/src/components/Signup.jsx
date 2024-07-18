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

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [errors, setErrors] = useState({ name: '', email: '', password: ''});

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    return re.test(password);
  };

  const validateForm = () => {
    let nameError = '';
    let emailError = '';
    let passwordError = '';

    if (!email) {
      emailError = 'Email is required';
    } else if (!validateEmail(email)) {
      emailError = 'Invalid email format';
    }

    if (!password) {
      passwordError = 'Password is required';
    } else if (!validatePassword(password)) {
      passwordError = 'Password must contain at least 6 characters, including uppercase, lowercase, number, and symbol';
    }

    if (!name) {
      nameError = 'Name is required';
    }

    setErrors({name: nameError, email: emailError, password: passwordError });

    return !nameError && !emailError && !passwordError;
  };

  const handleNameChange = (e) => {
    const name = e.target.value;
    setName(name);
    setErrors((prevErrors) => ({
      ...prevErrors,
      name: name ? '' : 'Name is required'
    }));
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
      password: password
        ? (validatePassword(password)
          ? ''
          : 'Password must contain at least 6 characters, including uppercase, lowercase, number, and symbol')
        : 'Password is required'
    }));
  };

  const handleSignup = () => {
    if (validateForm()) {
      console.log('Signing up:', { name, email, password});
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container maxWidth={isSmallScreen ? 'sm' : 'xs'}>
      <FormContainer>
        <Typography variant="h4" component="h1" gutterBottom>
          Sign Up
        </Typography>
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={name}
          onChange={handleNameChange}
          error={!!errors.name}
          helperText={errors.name}
        />
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
                  {showPassword ? <Visibility/> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />
        
        <Button
          variant="contained"
          color="primary"
          onClick={handleSignup}
          sx={{ marginTop: '20px' }}
        >
          Sign Up
        </Button>
      </FormContainer>
    </Container>
  );
};

export default SignupPage;
