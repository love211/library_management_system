import * as React from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useAuth } from '../context/AuthContext';
import { styled, Avatar } from '@mui/material';


export default function Header() {

  const { isAuthenticated, handleLogout } = useAuth();

  const goToLoginPage = () => {
    window.location.href = '/';
  }

  const handleProfile = () => {
    window.location.href = '/profile';
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'left' }}>
            Library Management
          </Typography>{
            isAuthenticated && (
          <Box onClick={()=> handleProfile()}>
          <ProfileAvatar>
                <img
                  src="https://images.chesscomfiles.com/uploads/v1/user/174668851.fd68ffc1.161x161o.5e0dada48cac@2x.jpg"
                  alt="pro"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </ProfileAvatar>
          </Box>
            )}
          { isAuthenticated ? 
            <Button color="inherit" onClick={handleLogout}>Logout</Button> : 
            <Button color="inherit" onClick={goToLoginPage}>Login</Button>}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

const ProfileAvatar = styled(Avatar)`
  width: 40px;
  height: 40px;
  cursor: pointer;
`;