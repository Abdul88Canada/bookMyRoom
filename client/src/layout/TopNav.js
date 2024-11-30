import React from 'react';
import '../assets/css/TopNav.css';

const TopNav = () => {
    return (
        <div className="top-nav">
            <div className="left-section">
                <button className="menu-button">
                    <i className="fas fa-bars"></i>
                </button>
                <div className="logo">
                    <img src="https://www.monshaat.gov.sa/themes/eportal2_new/assets/imgs/m_Logo.png" alt="Logo" />
                </div>
            </div>
            <div className="right-section">
                <a href="/admin" className="admin-platform">
                    Admin Platform <i className="fas fa-external-link-alt"></i>
                </a>
                <button className="icon-button">
                    <i className="fas fa-bell"></i>
                </button>
                <button className="icon-button">
                    <i className="fas fa-user-circle"></i>
                </button>
            </div>
        </div>
    );
};

export default TopNav;
