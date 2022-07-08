import './App.css';
import theme from './styles/theme'
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { Provider } from "react-redux"
import store from './state/store';
import NavBar from './components/NavBar'
import HomeCompany from './views/Company/HomeCompany';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Routes,Route } from 'react-router-dom'
import publicRoutes from './routes/publicRoutes';
import adminRoutes from './routes/adminRoutes';
import Alert from './commons/Alert';
import  {Calendar}  from './commons/Calendar';
import CalendarBranch from './views/CalendarBranch';

import Reports from './components/Reports/Reports';
import SideBar from './components/SideBar/index'
import Box from  '@mui/material/Box';

function App() {

  return (
    <Provider store={store} >
      <LocalizationProvider dateAdapter={AdapterDateFns}>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Alert/>
        <NavBar/>
        <Routes>
        <Route path='company/:companyId/branch/:branchId' element={<CalendarBranch/>}/>
          {adminRoutes}
          {publicRoutes}
          <Route path="/home/reportes" element={
          <Box display="flex" direction="column">
          <SideBar/>
          <Reports/>
          </Box>
          }/>
        </Routes>
      </ThemeProvider>
      </LocalizationProvider>
    </Provider>
  );
}

export default App;
