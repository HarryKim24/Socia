/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InstagramIcon from '@mui/icons-material/Instagram';
import { AppBar, Toolbar, Typography, Button, Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

const TopBar = ({ currentUser }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirmLogout = () => {
    setOpen(false);
    navigate('/login');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <>
      <AppBar position="sticky" sx={{ minHeight: '64px', width: '100%' }}>
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <InstagramIcon sx={{ marginRight: 1 }} />
            <Typography variant="h6">SOCIA</Typography>
          </Box>
          <Box sx={{ marginLeft: 'auto' }}>
            {currentUser ? (
              <Button color="inherit" onClick={handleLogoutClick}>
                Logout
              </Button>
            ) : (
              <Button color="inherit" onClick={handleLoginClick}>
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>로그아웃</DialogTitle>
        <DialogContent>
          <DialogContentText>로그아웃 하시겠습니까?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" sx={{ fontWeight: '700' }}>
            취소
          </Button>
          <Button onClick={handleConfirmLogout} color="error" autoFocus sx={{ fontWeight: '700' }}>
            로그아웃
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TopBar;
