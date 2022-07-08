import React from 'react';
import { Navigate, Outlet,Route } from 'react-router-dom';
import { useSelector } from 'react-redux'
import Home from '../views/Home';
import Branches from '../views/Branches';

const ProtectedAdminRoute = () => {
    const user = useSelector(state=>state.user)
    return user.userInfo.id ? <Outlet /> : <Navigate to="/login" />;
}

const adminRoutes = 
    <Route exact path='/home' element={<ProtectedAdminRoute/>}>
        <Route exact path='/home/:entity' element={<Home/>}/>
        <Route exact path='/home/companias/:companyId/sucursales' element={<Branches/>}/>
    </Route>

export default adminRoutes