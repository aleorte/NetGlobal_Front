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


function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Routes>
        <Route path="/home" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/recover" element={<RecoverPassword/>}/>
        </Routes>

      </ThemeProvider>
    </Provider>
  );
}

export default App;
