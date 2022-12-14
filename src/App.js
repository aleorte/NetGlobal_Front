import './App.css';
import theme from './styles/theme'
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { Provider } from "react-redux"
import store from './state/store';
import NavBar from './components/NavBar'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Routes } from 'react-router-dom'
import publicRoutes from './routes/publicRoutes';
import adminRoutes from './routes/adminRoutes';
import Alert from './commons/Alert';

function App() {

  return (
    <Provider store={store} >
      <LocalizationProvider dateAdapter={AdapterDateFns}>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Alert/>
        <NavBar/>
        <Routes>
          {adminRoutes}
          {publicRoutes}
        </Routes>
      </ThemeProvider>
      </LocalizationProvider>
    </Provider>
  );
}

export default App;
