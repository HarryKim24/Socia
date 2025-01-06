import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#673ab7',
    },
    secondary: {
      main: '#9e77d4',
    },
    error: {
      main: '#f44336',
    },
    background: {
      default: '#d1c4e9',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

export default theme;
