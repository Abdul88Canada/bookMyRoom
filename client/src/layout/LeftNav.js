import React from 'react';
import '../assets/css/LeftNav.css';

const LeftNav = () => {
    return (
        <div className="left-nav">
            <ul>
                <li>
                    <i className="fas fa-map"></i> Office Map
                </li>
                <li>
                    <i className="fas fa-calendar-alt"></i> Schedule
                </li>
                <li className="active">
                    <i className="fas fa-calendar"></i> Meeting Rooms
                </li>
                <li>
                    <i className="fas fa-users"></i> Company Directory
                </li>
                <li>
                    <i className="fas fa-user-circle"></i> My Account
                </li>
                <li>
                    <i className="fas fa-cog"></i> Admin Platform <i className="fas fa-external-link-alt"></i>
                </li>
            </ul>
        </div>
    );
};

export default LeftNav;
