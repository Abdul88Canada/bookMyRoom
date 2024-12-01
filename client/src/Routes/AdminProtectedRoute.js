// src/routes/ProtectedRoute.js

import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import UserContext from '../contexts/user/UserContext';
import { Spinner } from 'reactstrap';

const AdminProtectedRoute = ({ children }) => {
    const { user, loading } = useContext(UserContext);

    if (loading) {
        return <Spinner />; // Show a loading spinner while the user information is being fetched
    }

    if (!user || user.status != 'active' || user.role !='admin') {
        return <Navigate to="/admin/login" />;
    }

    return children ? children : <Outlet />;
};

export default AdminProtectedRoute;
