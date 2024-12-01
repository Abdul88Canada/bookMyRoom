import React from 'react';
import '../assets/css/LeftNav.css';

const LeftNav = () => {
    return (
        <div className="left-nav">
        <ul>
            {/* <li>
                <i className="fas fa-map"></i>
                <span>Office Map</span>
            </li> */}
            <li>
                <i className="fas fa-calendar-alt"></i>
                <span>Schedule</span>
            </li>
            <li className="active">
                <i className="fas fa-calendar"></i>
                <span>Meeting Rooms</span>
            </li>
            <li>
                <i className="fas fa-users"></i>
                <span>Company Directory</span>
            </li>
            <li>
                <i className="fas fa-user-circle"></i>
                <span>My Account</span>
            </li>
            <div className="divider"></div>
            <li>
                <i className="fas fa-cog"></i>
                <span>Admin Platform</span>
            </li>
        </ul>
    </div>
    );
};

export default LeftNav;
