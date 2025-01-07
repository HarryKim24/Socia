// App.jsx
import './App.css';
import AppRouter from './routes/AppRouter';
import { ThemeProvider } from '@mui/material/styles';
import theme from './styles/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppRouter />
    </ThemeProvider>
  );
}

export default App;
