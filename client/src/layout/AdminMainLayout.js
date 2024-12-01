import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminLeftNav from './AdminLeftNav';
import TopNav from './TopNav';

const AdminMainLayout = () => {
    return (
        <div className="main-layout">
        <TopNav />
        <div className="main-container">
            <AdminLeftNav />
            <div className="content">
                <Outlet />
            </div>
        </div>
    </div>
    );
};

export default AdminMainLayout;
