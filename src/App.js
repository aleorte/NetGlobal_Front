import './App.css';
import theme from './styles/theme'
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { Routes,Route } from 'react-router'
import Login from './views/Login'  
import Home from './views/Home';
import RecoverPassword from './views/RecoverPassword'
import { Provider } from "react-redux"
import store from './state/store';
import NavBar from './components/NavBar'
import HomeCompany from './views/Company/HomeCompany';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';


function App() {
  
  return (
    <Provider store={store} >
      <LocalizationProvider dateAdapter={AdapterDateFns}>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <NavBar/>
        <Routes>
          <Route path="/home" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/recover" element={<RecoverPassword/>}/>
          <Route path="/home/:entity/*" element={<Home/>}/>
          <Route path="/companies" element={<HomeCompany/>}/>
        </Routes>
      </ThemeProvider>
      </LocalizationProvider>
    </Provider>
  );
}

export default App;
