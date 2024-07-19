import * as React from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useAuth } from '../context/AuthContext';

export default function Header() {

  const { isAuthenticated, handleLogout } = useAuth();

  const goToLoginPage = () => {

  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'left' }}>
            Library Management
          </Typography>
          { isAuthenticated ? 
            <Button color="inherit" onClick={handleLogout}>Logout</Button> : 
            <Button color="inherit" onClick={goToLoginPage}>Login</Button>}
        </Toolbar>
      </AppBar>
    </Box>
  );
}