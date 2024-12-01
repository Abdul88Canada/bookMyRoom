import React from 'react';
import '../assets/css/TopNav.css';

const TopNav = () => {
    return (
        <div className="top-nav">
            <div className="left-section">
                <button className="menu-button">
                    <i className="fas fa-bars"></i>
                </button>
                
            </div>
            <div className="right-section">
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
