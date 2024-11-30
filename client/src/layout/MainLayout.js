import React from 'react';
import { Outlet } from 'react-router-dom';
import LeftNav from './LeftNav';
import TopNav from './TopNav';

const MainLayout = () => {
    return (
        <div className="main-layout">
        <TopNav />
        <div className="main-container">
            <LeftNav />
            <div className="content">
                <Outlet />
            </div>
        </div>
    </div>
    );
};

export default MainLayout;
