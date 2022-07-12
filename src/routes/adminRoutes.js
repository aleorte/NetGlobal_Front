import React from 'react';
import { Navigate, Outlet,Route } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { Box, Toolbar } from '../styles/material'
import SideBar from '../components/SideBar'
import Companies from '../components/Companies'
import Guards from '../components/Guards'
import Admins from '../components/Admins'
import Branches from '../components/Branches';
import { Calendar } from '../commons/Calendar';
import Inactives from '../views/Inactives';
import Reports from '../views/Reports';

const ProtectedAdminRoute = () => {

    const user = useSelector(state=>state.user)

    return user.userInfo.id ? 
        <Box sx={{ display: "flex" }}>
            <SideBar />
            <Box
            component="main"
            sx={{
                flexGrow: 1,
                p: 3,
                width: { sm: `calc(100% - 240px)` },
                minHeight: "calc(100vh - 64px)",
                backgroundColor: "#F4F6F8",
            }}
            >
            <Toolbar />         
            <Outlet />          
            </Box>
        </Box>
    : 
        <Navigate to="/login" />;
}

const ProtectedSuperAdminRoute = () => {
    const user = useSelector(state=>state.user)
    return user.userInfo.superAdmin ? <Outlet /> : <Navigate to="/home/companias" />;
}


const adminRoutes = 
    <Route exact path='/home' element={<ProtectedAdminRoute/>}>
        <Route exact path='companias' element={<Companies/>}/>
        <Route exact path='vigiladores' element={<Guards/>}/>
        <Route exact path='reportes/:report' element={<Reports/>}/>
        <Route exact path='companias/:companyId/sucursales' element={<Branches/>}/>
        <Route exact path='companias/:companyId/sucursales/:branchId' element={<Calendar/>}/>
        <Route exact path='inasistencias' element={<Inactives/>}/>
        <Route exact path='admins' element={<ProtectedSuperAdminRoute/>}>
            <Route exact path='' element={<Admins/>}/>
        </Route>
    </Route>
    
export default adminRoutes