import './App.css';
import theme from './styles/theme'
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { Provider } from "react-redux"
import store from './state/store';
import { Routes,Route } from 'react-router-dom'
import NavBar from './components/NavBar';
import publicRoutes from './routes/publicRoutes';
import adminRoutes from './routes/adminRoutes';
import Alert from './commons/Alert';

function App() {

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Alert/>
        <NavBar/> 
        <Routes>      
          {adminRoutes}
          {publicRoutes}
        </Routes>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
