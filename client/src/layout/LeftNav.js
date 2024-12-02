import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../assets/css/LeftNav.css';

const LeftNav = () => {

    return (
        <div className={`left-nav`}>
            <div className="sidebar-header">
                <div className="logo leftnav-logo">
                    <img
                        src="https://www.monshaat.gov.sa/themes/eportal2_new/assets/imgs/m_Logo.png"
                        alt="Logo"
                    />
                </div>
                <p>Booking System</p>
            </div>
            <hr className="divider" />

            <nav>
                <ul>
                <li>
                        <NavLink
                            to="/app/dashboard"
                            className={({ isActive }) =>
                                isActive ? 'nav-link active' : 'nav-link'
                            }
                        >
                            <i class="fas fa-tachometer-alt"></i>
                            <span>Dashboard</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/app/schedule"
                            className={({ isActive }) =>
                                isActive ? 'nav-link active' : 'nav-link'
                            }
                        >
                            <i className="fas fa-calendar-alt"></i>
                            <span>Schedule</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/app/location"
                            className={({ isActive }) =>
                                isActive ? 'nav-link active' : 'nav-link'
                            }
                        >
                            <i className="fas fa-calendar"></i>
                            <span>Meeting Rooms</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/app/company-directory"
                            className={({ isActive }) =>
                                isActive ? 'nav-link active' : 'nav-link'
                            }
                        >
                            <i className="fas fa-users"></i>
                            <span>Company Directory</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/my-account"
                            className={({ isActive }) =>
                                isActive ? 'nav-link active' : 'nav-link'
                            }
                        >
                            <i className="fas fa-user-circle"></i>
                            <span>My Account</span>
                        </NavLink>
                    </li>
                    <div className="divider"></div>
                </ul>
            </nav>
        </div>
    );
};

export default LeftNav;
