import './App.css';
import theme from './styles/theme'
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import Login from './views/Login'
import RecoverPassword from './views/RecoverPassword';
import {Provider} from "react-redux"
import store from './state/store';

function App() {
  return (
    <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <RecoverPassword/>
    </ThemeProvider>
    </Provider>
  );
}

export default App;
