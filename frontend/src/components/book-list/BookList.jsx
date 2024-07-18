import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Divider } from '@mui/material';
import { Visibility, Edit, Delete } from '@mui/icons-material';
import { styled } from '@mui/system';

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(2),
}));

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  padding: theme.spacing(3),
}));

const BookDetailsBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1.5),
  padding: theme.spacing(2),
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
}));

const dummyBooks = [
  {
    id: 1,
    bookTitle: 'The Great Gatsby',
    type: 'Fiction',
    quantity: 10,
    authorName: 'F. Scott Fitzgerald',
    price: 15.99,
    publishedYear: 1925
  },
  {
    id: 2,
    bookTitle: 'To Kill a Mockingbird',
    type: 'Fiction',
    quantity: 8,
    authorName: 'Harper Lee',
    price: 10.99,
    publishedYear: 1960
  },
  // Add more dummy data as needed
];

const BookList = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState(dummyBooks);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  const handleAddBook = () => {
    navigate('/add-book');
  };

  const handleViewBook = (book) => {
    setSelectedBook(book);
    setIsViewDialogOpen(true);
  };

  const handleEditBook = (book) => {
    navigate('/add-book', { state: { isEdit: true, book } });
  };

  const handleDeleteBook = (id) => {
    setBooks(books.filter(book => book.id !== id));
  };

  const handleCloseDialog = () => {
    setIsViewDialogOpen(false);
    setSelectedBook(null);
  };

  return (
    <Container>
      <Box display="flex" justifyContent="space-between" alignItems="center" mt={4}>
        <Typography variant="h4">Book List</Typography>
        <Button variant="contained" color="primary" onClick={handleAddBook}>
          Add Book
        </Button>
      </Box>
      <TableContainer component={Paper} sx={{ marginTop: '20px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Published Year</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map((book) => (
              <TableRow key={book.id}>
                <TableCell>{book.bookTitle}</TableCell>
                <TableCell>{book.type}</TableCell>
                <TableCell>{book.quantity}</TableCell>
                <TableCell>{book.authorName}</TableCell>
                <TableCell>{book.price}</TableCell>
                <TableCell>{book.publishedYear}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleViewBook(book)}>
                    <Visibility />
                  </IconButton>
                  <IconButton onClick={() => handleEditBook(book)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteBook(book.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={isViewDialogOpen} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <StyledDialogTitle>Book Details</StyledDialogTitle>
        <StyledDialogContent>
          {selectedBook && (
            <BookDetailsBox>
              <Typography variant="h6">Title: {selectedBook.bookTitle}</Typography>
              <Divider />
              <Typography variant="body1">Type: {selectedBook.type}</Typography>
              <Typography variant="body1">Quantity: {selectedBook.quantity}</Typography>
              <Typography variant="body1">Author: {selectedBook.authorName}</Typography>
              <Typography variant="body1">Price: ${selectedBook.price}</Typography>
              <Typography variant="body1">Published Year: {selectedBook.publishedYear}</Typography>
            </BookDetailsBox>
          )}
        </StyledDialogContent>
        <DialogActions sx={{ justifyContent: 'space-between', padding: 2 }}>
          <Button variant="contained" color="primary" onClick={() => console.log('Borrow book:', selectedBook.id)}>
            Borrow
          </Button>
          <Button variant="contained" color="secondary" onClick={() => console.log('Return book:', selectedBook.id)}>
            Return
          </Button>
          <Button variant="outlined" onClick={handleCloseDialog}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default BookList;
