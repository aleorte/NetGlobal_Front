import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux'

const PrivateAdminRoute = () => {

    const user = useSelector(state=>state.user)
 
    return user.userInfo.id ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateAdminRoute