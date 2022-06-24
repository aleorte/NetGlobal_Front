import './App.css';
import theme from './styles/theme'
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
<<<<<<< Updated upstream
import Login from './views/Login'
import RecoverPassword from './views/RecoverPassword';
import {Provider} from "react-redux"
=======
import { Routes,Route } from 'react-router'
import Login from './views/Login'  
import Home from './views/Home';
import RecoverPassword from './views/RecoverPassword'
import { Provider } from "react-redux"
>>>>>>> Stashed changes
import store from './state/store';


function App() {
  return (
    <Provider store={store}>
<<<<<<< Updated upstream
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <RecoverPassword/>
    </ThemeProvider>
=======
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Routes>
        <Route path="/home" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/recover" element={<RecoverPassword/>}/>
        </Routes>
    
      </ThemeProvider>
>>>>>>> Stashed changes
    </Provider>
  );
}

export default App;
