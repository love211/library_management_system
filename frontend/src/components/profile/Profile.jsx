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
  Container,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Pagination,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getBookIssueData, returnBookList } from "../../services/apis";
import { Visibility } from "@mui/icons-material";

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

const StyledPagination = styled(Pagination)(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-end",
  marginTop: "10px",
}));

const Profile = () => {
  const navigate = useNavigate();
  const goToBookList = () => {
    navigate("/book-list");
  };
  const [userDetails, setUserDetails] = useState({});
  const [issueData, setIssueData] = useState({});
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const userData = JSON.parse(localStorage.getItem("userData"));

  const getIssueBook = async (Currentpage) => {
    const issueResponse = await getBookIssueData(userData.id, Currentpage);
    setUserDetails(issueResponse.data.user);
    setIssueData(issueResponse.data.issueData);
    setPageCount(issueResponse.meta.totalBooks);
  };

  useEffect(() => {
    getIssueBook(page);
  }, []);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
    getIssueBook(newPage);
  };

  const handleReturn = async (returnId, bookId) => {
    const response = await returnBookList(returnId, bookId);
    getIssueBook(page);
    console.log("resposss", response);
  };

  return (
    <ProfileContainer component="main">
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
                  <span style={{ color: "#757575" }}>{userData?.email}</span>
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
            count={Math.ceil(pageCount / 10)}
          />
        )}
      </Container>
    </ProfileContainer>
  );
};

export default Profile;
