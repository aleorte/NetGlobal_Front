import './App.css';
import theme from './styles/theme'
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import Login from './views/Login'
import RecoverPassword from './views/RecoverPassword'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <RecoverPassword/>
    </ThemeProvider>
  );
}

export default App;
