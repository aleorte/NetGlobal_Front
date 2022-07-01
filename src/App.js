import './App.css';
import theme from './styles/theme'
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { Provider } from "react-redux"
import store from './state/store';
import { Routes,Route,Navigate } from 'react-router-dom'
import NavBar from './components/NavBar';
import Login from './views/Login';
import RecoverPassword from './views/RecoverPassword';
import Home from './views/Home';
import PrivateRoute from './routes/PrivateAdminRoute';

function App() {

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <NavBar/> 
        <Routes>      
          <Route exact path='/home' element={<PrivateRoute/>}>
            <Route exact path='/home/:entity/*' element={<Home/>}/>
          </Route>
          <Route path="/" element={<Navigate to="/login"/>}/>,
          <Route path="/login" element={<Login/>}/>,
          <Route path="/recover" element={<RecoverPassword/>}/>
        </Routes>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
