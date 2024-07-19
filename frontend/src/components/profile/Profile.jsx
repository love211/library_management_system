import React, { useEffect, useState } from "react";
import Link from "@mui/material/Link";
import {
  Typography,
  Grid,
  Paper,
  Button,
  Box,
  Avatar,
  styled,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Container,
  Dialog,
  DialogTitle,
  Pagination,
  DialogContent,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getBookIssueData, returnBookList } from "../../services/apis";
import { Visibility } from "@mui/icons-material";
import { getUserDataForAdmin } from "../../services/apis";

// Styled components for custom styling
const ProfileContainer = styled(Box)`
  margin: auto;
`;

const ScrollableContainer = styled(Box)`
  width: 80vw;
  height: 100%;
  margin: auto;

  overflow: auto;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE 11 */
  &::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
  }
`;

const ProfileCard = styled(Paper)`
  max-width: 868px;
  padding: 20px;
  display: flex;
  flex-direction: column;

  @media (min-width: 600px) {
    flex-direction: row;
  }
`;

const ProfileAvatar = styled(Avatar)`
  width: 160px;
  height: 160px;
`;

const ProfileInfo = styled(Grid)`
  padding-left: 20px;

  @media (max-width: 600px) {
    padding-top: 20px;
  }
`;

const StyledButton = styled(Button)`
  background-color: #031b59;
  color: #fff;
  text-transform: capitalize;
  //   width: 120px;
  padding: 6px;
`;


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
   marginTop: "20px",
  marginBottom: "20px"

}));

const Profile = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({});
  const [userList, setUserList] = useState([]);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const [issueData, setIssueData] = useState({});
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [pageCountUser, setPageCountUser] = useState(1);
  const currentUser = JSON.parse(localStorage.getItem("userData"));
  console.log("currentUser", currentUser)
  const userData = JSON.parse(localStorage.getItem("token"));
  const goToBookList = () => {
    navigate("/book-list");
  };

  const handleCloseDialog = () => {
    setIsViewDialogOpen(false);
  };

  const getUserList = async (page) => {
    const res = await getUserDataForAdmin(page);
    setUserList(res.data);
    setPageCount(res.meta.totalUsers);
  };

  const handleViewUser = (user) => {
    setIsViewDialogOpen(true);
    setSelectedUser(user);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  }

  const getIssueBook = async (Currentpage) => {
    const issueResponse = await getBookIssueData(currentUser.id, Currentpage);
    setUserDetails(issueResponse.data.user);
    setIssueData(issueResponse?.data?.issueData);
    setPageCountUser(issueResponse?.meta?.totalBooks);
  };

  useEffect(() => {
    getIssueBook(page);
  }, []);

  const handleReturn = async (returnId, bookId) => {
    const response = await returnBookList(returnId, bookId);
    getIssueBook(page);
    console.log("resposss", response);
  };

  useEffect(() => {
    getUserList(page);
  }, [page]);
  return (
    <ProfileContainer component="main">
      {userData.role === "admin" ? (
        <Container>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mt={8}
          >
            <Typography variant="h4">User List</Typography>
          </Box>
          <TableContainer component={Paper} sx={{ marginTop: "20px" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Username</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone Number</TableCell>

                  <TableCell>View</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userList && userList?.map((user) => {
                  return (
                    <TableRow key={user.id}>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell align="">
                        {user.phon_number ?? "---"}
                      </TableCell>
                      <TableCell>
                        <IconButton onClick={() => handleViewUser(user)}>
                          <Visibility />
                        </IconButton>
                      </TableCell>
                    </TableRow>
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
              {selectedUser && (
                <BookDetailsBox>
                  <Typography variant="h6">
                    Name: {selectedUser.name}
                  </Typography>
                  <Divider />
                  <Typography variant="body1">
                    Email: {selectedUser.email}
                  </Typography>
                  <Typography variant="body1">
                    Phone: {selectedUser.phon_number}
                  </Typography>
                  <Typography variant="body1">
                    Address: {selectedUser.address}
                  </Typography>
                </BookDetailsBox>
              )}
            </StyledDialogContent>
          </Dialog>
          <StyledPagination onChange={handlePageChange}  count={Math.ceil(pageCount/10)} />
        </Container>
      ) : (
        <>
      <ScrollableContainer
        style={{
          marginTop: "10px",
        }}
      >
        <Typography
          variant="h4"
          style={{
            marginBottom: "1rem",
            color: "#031B59",
            textTransform: "uppercase",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Profile
        </Typography>
        <ProfileCard style={{ margin: "auto" }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={3}>
              <ProfileAvatar>
                <img
                  src="https://images.chesscomfiles.com/uploads/v1/user/174668851.fd68ffc1.161x161o.5e0dada48cac@2x.jpg"
                  alt="pro"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </ProfileAvatar>
            </Grid>
            <ProfileInfo item xs={12} sm={9}>
              <Typography
                variant="h5"
                style={{
                  marginBottom: "0.5rem",
                  fontWeight: "800",
                  color: "#031B59",
                  textAlign: "left",
                }}
              >
                <Link
                  href="https://www.chess.com/member/karanbairwaa"
                  underline="hover"
                  color="inherit"
                >
                  {userDetails?.name}
                </Link>
              </Typography>
              <Box>
                <Box
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.8rem",
                    marginBottom: "1rem",
                  }}
                >
                  <span style={{ color: "#757575" }}>{currentUser?.email}</span>
                </Box>
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "0.8rem",
                    marginBottom: "1rem",
                  }}
                >
                  <span style={{ color: "#757575" }}>
                    India/Asia, (Rajasthan)
                  </span>
                </Box>
                <Box
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.8rem",
                    marginBottom: "1rem",
                  }}
                >
                  <StyledButton variant="contained" onClick={goToBookList}>
                    Borrow another book
                  </StyledButton>
                </Box>
              </Box>
            </ProfileInfo>
          </Grid>
        </ProfileCard>
      </ScrollableContainer>
      <Container>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt={8}
        >
          <Typography variant="h4">Issued Books</Typography>
        </Box>
        <TableContainer component={Paper} sx={{ marginTop: "20px" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Issue Date</TableCell>
                <TableCell>Return Date</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {issueData?.length > 0 &&
                issueData?.map((book) => (
                  <TableRow key={book.id}>
                    <TableCell>{book?.book_title}</TableCell>
                    <TableCell>{book?.issue_date}</TableCell>
                    <TableCell>{book?.return_date}</TableCell>
                    <TableCell>
                      <Button
                        onClick={() => handleReturn(book?.id, book?.book_id)}
                      >
                        Return
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        {issueData?.length === 0 ? (
          <Box style={{ marginTop: "10px" }}>No Book Issued </Box>
        ) : (
          <StyledPagination
            onChange={handlePageChange}
            count={Math.ceil(pageCountUser / 10)}
          />
        )}
      </Container>
       </>
      )}
    </ProfileContainer>
  );
};

export default Profile;
