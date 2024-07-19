import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  Pagination,
} from "@mui/material";
import { Visibility, Edit, Delete } from "@mui/icons-material";
import { styled } from "@mui/system";
import {
  boorowBookList,
  deleteBook,
  getBookListData,
  returnBookList,
} from "../../services/apis";

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  textAlign: "center",
  padding: theme.spacing(2),
}));

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  padding: theme.spacing(3),
}));

const BookDetailsBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1.5),
  padding: theme.spacing(2),
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
}));

const StyledPagination = styled(Pagination)(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-end",
  marginTop: "10px",
}));

const BookList = () => {
  const navigate = useNavigate();
  const userRole = JSON.parse(localStorage.getItem("token"));
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);

  const handleAddBook = () => {
    navigate("/add-book");
  };

  const handleViewBook = (book) => {
    setSelectedBook(book);
    setIsViewDialogOpen(true);
  };

  const handleEditBook = (book) => {
    navigate("/add-book", { state: { isEdit: true, book } });
  };

  const handleDeleteBook = async (id) => {
    const res = await deleteBook(id);
    if (res.status === 200) {
      getBooklist();
    }
  };

  const handleCloseDialog = () => {
    setIsViewDialogOpen(false);
    setSelectedBook(null);
  };

  const getBooklist = async () => {
    const res = await getBookListData(page);
    setPageCount(res.meta.totalBooks);
    setBooks(res.data);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    getBooklist();
  }, []);

  const handleBorrowBook = async (viewBookData) => {
    const currentDate = new Date();
    const futureDate = new Date(currentDate);
    futureDate.setDate(currentDate.getDate() + 7);
    const payload = {
      book_id: Number(viewBookData?.book_id),
      book_title: viewBookData?.book_title,
      issued_to: userData?.id,
      issue_date: currentDate.toLocaleDateString(),
      return_date: futureDate.toLocaleDateString(),
    };
    const borrowResponse = await boorowBookList(payload);
    if (borrowResponse.result === "Success") {
      setIsViewDialogOpen(false);
      getBooklist();
    }
  };

  return (
    <Container>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mt={4}
      >
        <Typography variant="h4">Book List</Typography>
        {userRole.role === "admin" && (
          <Button variant="contained" color="primary" onClick={handleAddBook}>
            Add Book
          </Button>
        )}
      </Box>
      <TableContainer component={Paper} sx={{ marginTop: "20px" }}>
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
            {books.map((book) => {
              return (
                book.quantity > 0 && (
                  <TableRow key={book.id}>
                    <TableCell>{book.book_title}</TableCell>
                    <TableCell>{book.type}</TableCell>
                    <TableCell>{book.quantity}</TableCell>
                    <TableCell>{book.author_name}</TableCell>
                    <TableCell>{book.price}</TableCell>
                    <TableCell>{book.published_year}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleViewBook(book)}>
                        <Visibility />
                      </IconButton>
                      {userRole?.role == "admin" && (
                        <>
                          <IconButton onClick={() => handleEditBook(book)}>
                            <Edit />
                          </IconButton>
                          <IconButton
                            onClick={() => handleDeleteBook(book.book_id)}
                          >
                            <Delete />
                          </IconButton>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                )
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog
        open={isViewDialogOpen}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="sm"
      >
        <StyledDialogTitle>Book Details</StyledDialogTitle>
        <StyledDialogContent>
          {selectedBook && (
            <BookDetailsBox>
              <Typography variant="h6">
                Title: {selectedBook.book_title}
              </Typography>
              <Divider />
              <Typography variant="body1">Type: {selectedBook.type}</Typography>
              <Typography variant="body1">
                Quantity: {selectedBook.quantity}
              </Typography>
              <Typography variant="body1">
                Author: {selectedBook.author_name}
              </Typography>
              <Typography variant="body1">
                Price: ${selectedBook.price}
              </Typography>
              <Typography variant="body1">
                Published Year: {selectedBook.published_year}
              </Typography>
            </BookDetailsBox>
          )}
        </StyledDialogContent>
        <DialogActions sx={{ justifyContent: "space-between", padding: 2 }}>
          {userRole.role === "user" && (
            <>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleBorrowBook(selectedBook)}
              >
                Borrow
              </Button>
            </>
          )}
          <Button variant="outlined" onClick={handleCloseDialog}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <StyledPagination
        onChange={handlePageChange}
        count={Math.ceil(pageCount / 10)}
      />
    </Container>
  );
};

export default BookList;
