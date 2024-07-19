import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  IconButton,
  InputAdornment,
  Link,
  ThemeProvider,
  createTheme
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { login } from '../services/apis';
import { useAuth } from '../context/AuthContext';
import book_image from "../assets/book_image.jpg";

import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';


const PageContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  height: 'calc(100vh - 70px)',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    height: 'auto',
  },
}));

const ImageContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  // width: '100%',
  // height: '100%',
  [theme.breakpoints.down('sm')]: {
    // height: '200px',
  },
}));

const FormContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    )
});

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { handleLogin } = useAuth();
  const navigate = useNavigate()
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleFormSubmit = async (values) => {
    try {
      const loginResponse = await handleLogin(values.email, values.password);
      navigate('/book-list');
      console.log('Logging in:', loginResponse);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <>
      <PageContainer>
        <ImageContainer>
          <img src={book_image} alt="" style={{ width: "100%", height: '100%' }} />
        </ImageContainer>
        <Container maxWidth={isSmallScreen ? 'sm' : 'md'} sx={{ width: { sm: '50%' }, margin: { sm: "auto" } }}>
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              handleFormSubmit(values);
              setSubmitting(false);
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <FormContainer>
                  <Typography variant="h4" component="h1" gutterBottom>
                    Login
                  </Typography>
                  <Field
                    as={TextField}
                    name="email"
                    label="Email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    error={touched.email && !!errors.email}
                    helperText={touched.email ? errors.email : ''}
                  />
                  <Field
                    as={TextField}
                    name="password"
                    label="Password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    type={showPassword ? 'text' : 'password'}
                    error={touched.password && !!errors.password}
                    helperText={touched.password ? errors.password : ''}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ marginTop: '20px' }}
                  >
                    Login
                  </Button>
                  <Typography variant="body2" sx={{ marginTop: '10px' }}>
                    Don't have an account? <Link href="/signup">Sign up</Link>
                  </Typography>
                </FormContainer>
              </Form>
            )}
          </Formik>
        </Container>
      </PageContainer>
    </>
  );
};

export default LoginPage;
