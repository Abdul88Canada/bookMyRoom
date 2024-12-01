import React, { useState, useContext } from 'react';
import '../assets/css/TopNav.css';
import UserContext from '../contexts/user/UserContext';

const TopNav = () => {
    const [showDropdown, setShowDropdown] = useState(false); // State to toggle dropdown
    const { signOut } = useContext(UserContext); // Use the `signOut` method from the UserContext

    const handleUserIconClick = () => {
        setShowDropdown(!showDropdown); // Toggle dropdown visibility
    };

    const handleLogout = () => {
        signOut(); // Clear user data and redirect to login
        window.location.href = '/'; // Redirect to the login page
    };

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
                <div className="user-dropdown">
                    <button className="icon-button" onClick={handleUserIconClick}>
                        <i className="fas fa-user-circle"></i>
                    </button>
                    {showDropdown && (
                        <div className="tn-dropdown-menu">
                            <button className="logout-button" onClick={handleLogout}>
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TopNav;
