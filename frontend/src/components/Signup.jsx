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
import { register } from '../services/apis';

import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const FormContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  }
}));

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required')
    .min(3, 'Password must be at least 3 characters'),
  phone: Yup.string()
  .required('Phone number is required')
   .matches(/^[0-9]{10}$/, 'Invalid phone number'),
  address: Yup.string().required('Please enter the address'),
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

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleSignup = async (values) => {
    try {
      console.log('Signing up:', values);
      const registrationResp = await register(values);
      console.log("registrationResp", registrationResp);
      if(registrationResp.status ===201){
        navigate('/')
      }
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <Container maxWidth={isSmallScreen ? 'sm' : 'xs'}>
      <Formik
        initialValues={{ name: '', email: '', password: '', phone: '', address: '',}}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          handleSignup(values);
          setSubmitting(false);
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <FormContainer>
              <Typography variant="h4" component="h1" gutterBottom>
                Sign Up
              </Typography>
              <Field
                as={TextField}
                name="name"
                label="Name"
                variant="outlined"
                fullWidth
                margin="normal"
                error={touched.name && !!errors.name}
                helperText={touched.name ? errors.name : ''}
              />
             
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
               <Field
                as={TextField}
                name="phone"
                label="Phone Number"
                variant="outlined"
                fullWidth
                margin="normal"
                error={touched.phone && !!errors.phone}
                helperText={touched.phone ? errors.phone : ''}
              />
              <Field
                as={TextField}
                name="address"
                label="Address"
                variant="outlined"
                fullWidth
                margin="normal"
                error={touched.address && !!errors.address}
                helperText={touched.address ? errors.address : ''}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ marginTop: '20px' }}
              >
                Sign Up
              </Button>
            </FormContainer>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default SignupPage;
