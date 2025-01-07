import InstagramIcon from '@mui/icons-material/Instagram';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

const TopBar = () => {
  return (
    <AppBar position="sticky" sx={{ minHeight: '64px', width: '100%' }}>
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <InstagramIcon sx={{ marginRight: 1 }} />
          <Typography variant="h6">
            SOCIA
          </Typography>
        </Box>
        <Box sx={{ marginLeft: 'auto' }}>
          <Button color="inherit">
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
