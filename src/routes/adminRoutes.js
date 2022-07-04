import React from 'react';
import { Navigate, Outlet,Route } from 'react-router-dom';
import { useSelector } from 'react-redux'
import Home from '../views/Home';

const ProtectedAdminRoute = () => {
    const user = useSelector(state=>state.user)
    return user.userInfo.id ? <Outlet /> : <Navigate to="/login" />;
}

const adminRoutes = 
    <Route exact path='/home' element={<ProtectedAdminRoute/>}>
        <Route exact path='/home/:entity/*' element={<Home/>}/>
    </Route>

export default adminRoutes