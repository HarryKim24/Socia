import './App.css';
import AppRouter from './routes/AppRouter';
import { ThemeProvider } from '@mui/material/styles';
import theme from './styles/theme';
import { useState } from 'react';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <ThemeProvider theme={theme}>
      <AppRouter currentUser={currentUser} setCurrentUser={setCurrentUser} />
    </ThemeProvider>
  );
}

export default App;
