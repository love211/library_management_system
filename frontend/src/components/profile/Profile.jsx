import React from "react";
import Link from "@mui/material/Link";
import {
  Typography,
  Grid,
  Paper,
  Button,
  Box,
  Avatar,
  styled,
} from "@mui/material";
import { useNavigate } from "react-router-dom";


// Styled components for custom styling
const ProfileContainer = styled(Box)`
  height: 100vh;
  margin: auto;
`;

const ScrollableContainer = styled(Box)`
  width:80vw;
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

const Profile = () => {
    const navigate = useNavigate();
    const goToBookList = () =>{
        navigate("/book-list");
    }
  return (
    <ProfileContainer component="main">
      <ScrollableContainer  style={{
            marginTop:'10px'
          }}>
        <Typography
          variant="h4"
          style={{
            marginBottom: "1rem",
            color: "#031B59",
            textTransform: "uppercase",
            fontWeight: "bold",
            textAlign:"center",
            
          }}
        >
          Profile
        </Typography>
        <ProfileCard style={{margin: "auto"}}>
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
                  textAlign: 'left'
                }}
              >
                <Link
                  href="https://www.chess.com/member/karanbairwaa"
                  underline="hover"
                  color="inherit"
                >
                  Karanbairwaa
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
                  <span style={{ color: "#757575" }}>
                    karanbairwaa@gmail.com
                  </span>
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
                  <StyledButton variant="contained" onClick={goToBookList}>Borrow another book</StyledButton>
                  
                </Box>
              </Box>
            </ProfileInfo>
          </Grid>
        </ProfileCard>
      </ScrollableContainer>
    </ProfileContainer>
  );
};

export default Profile;
