import React from 'react';
import { useFormik } from 'formik';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
import { styled } from '@mui/system';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import * as Yup from 'yup';
import { addBook, editBook } from '../../services/apis';

const FormContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

const validationSchema = Yup.object({
  bookTitle: Yup.string().required('Book title is required'),
  quantity: Yup.number()
    .required('Quantity is required')
    .positive('Quantity must be a positive number'),
  authorName: Yup.string().required('Author name is required'),
  price: Yup.number().nullable().positive('Price must be a positive number'),
  publishedYear: Yup.number().nullable().positive('Published year must be a positive number'),
});

const AddBookForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isEdit = location.state?.isEdit;
  const bookToEdit = location.state?.book;

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const formik = useFormik({
    initialValues: {
      bookTitle: bookToEdit?.book_title || '',
      type: bookToEdit?.type || '',
      quantity: bookToEdit?.quantity || '',
      authorName: bookToEdit?.author_name || '',
      price: bookToEdit?.price || '',
      publishedYear: bookToEdit?.published_year || '',
    },
    validationSchema,
    onSubmit:async (values) => {
      if(isEdit){

        const apiresponse = await editBook(values, bookToEdit?.book_id);
        if(apiresponse.status === 200){
          navigate('/book-list');
        }
      }else{
        const apiresponse = await addBook(values);
        if(apiresponse.status === 201){
          navigate('/book-list');
        }
      }
      navigate('/book-list');
    },
  });

  return (
    <Container maxWidth={isSmallScreen ? 'sm' : 'xs'}>
      <FormContainer>
        <Typography variant="h4" component="h1" gutterBottom>
          {isEdit ? 'Edit Book' : 'Add Book'}
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            label="Book Title"
            variant="outlined"
            fullWidth
            margin="normal"
            name="bookTitle"
            value={formik.values.bookTitle}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.bookTitle && Boolean(formik.errors.bookTitle)}
            helperText={formik.touched.bookTitle && formik.errors.bookTitle}
          />
          <FormControl variant="outlined" fullWidth margin="normal">
            <InputLabel>Type</InputLabel>
            <Select
              name="type"
              value={formik.values.type}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              label="Type"
            >
              <MenuItem value=""><em>None</em></MenuItem>
              <MenuItem value="Fiction">Fiction</MenuItem>
              <MenuItem value="Non-Fiction">Non-Fiction</MenuItem>
              <MenuItem value="Biography">Biography</MenuItem>
              <MenuItem value="History">History</MenuItem>
              <MenuItem value="Science">Science</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Quantity"
            variant="outlined"
            fullWidth
            margin="normal"
            name="quantity"
            value={formik.values.quantity}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.quantity && Boolean(formik.errors.quantity)}
            helperText={formik.touched.quantity && formik.errors.quantity}
          />
          <TextField
            label="Author Name"
            variant="outlined"
            fullWidth
            margin="normal"
            name="authorName"
            value={formik.values.authorName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.authorName && Boolean(formik.errors.authorName)}
            helperText={formik.touched.authorName && formik.errors.authorName}
          />
          <TextField
            label="Price"
            variant="outlined"
            fullWidth
            margin="normal"
            name="price"
            value={formik.values.price}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.price && Boolean(formik.errors.price)}
            helperText={formik.touched.price && formik.errors.price}
          />
          <TextField
            label="Published Year"
            variant="outlined"
            fullWidth
            margin="normal"
            name="publishedYear"
            value={formik.values.publishedYear}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.publishedYear && Boolean(formik.errors.publishedYear)}
            helperText={formik.touched.publishedYear && formik.errors.publishedYear}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{ marginTop: '20px' }}
          >
            {isEdit ? 'Edit' : 'Add'} Book
          </Button>
        </form>
      </FormContainer>
    </Container>
  );
};

export default AddBookForm;
