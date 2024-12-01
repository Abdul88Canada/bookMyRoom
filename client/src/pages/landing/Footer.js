import React from 'react';
import './Footer.css'; // Create a new CSS file for footer styles

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                {/* Section: Monsha'at */}
                <div className="footer-section">
                    <h4>Monsha'at</h4>
                    <ul>
                        <li><a href="#about">About</a></li>
                        <li><a href="#board">Board of Directors</a></li>
                        <li><a href="#executives">Executives</a></li>
                        <li><a href="#structure">Organization Structure</a></li>
                        <li><a href="#message">Management Message</a></li>
                        <li><a href="#terms">Terms and Conditions</a></li>
                    </ul>
                </div>

                {/* Section: Contact & Support */}
                <div className="footer-section">
                    <h4>Contact & Support</h4>
                    <ul>
                        <li><a href="#contact">Contact Us</a></li>
                        <li><a href="#security">Information Security Strategy</a></li>
                        <li><a href="#faq">FAQ</a></li>
                        <li><a href="#user-guide">Monshaat Portal User Guide</a></li>
                        <li><a href="#oup-guide">User Guide for OUP Portal</a></li>
                        <li><a href="#complaints">Complaints Handling and Customer</a></li>
                    </ul>
                </div>

                {/* Section: Important Links */}
                <div className="footer-section">
                    <h4>Important Links</h4>
                    <ul>
                        <li><a href="#data-portal">National Data Portal</a></li>
                        <li><a href="#platform">The Unified National Platform</a></li>
                        <li><a href="#services">Financial Services Platform (Etimad)</a></li>
                        <li><a href="#tafawul">Tafawul Platform</a></li>
                        <li><a href="#watani">Watani Platform</a></li>
                        <li><a href="#nawath">Nawath App</a></li>
                    </ul>
                </div>

                {/* Section: Social Media */}
                <div className="footer-section social">
                    <div className="social-links">
                        <a href="#facebook"><i className="fab fa-facebook"></i></a>
                        <a href="#instagram"><i className="fab fa-instagram"></i></a>
                        <a href="#linkedin"><i className="fab fa-linkedin"></i></a>
                        <a href="#twitter"><i className="fab fa-twitter"></i></a>
                        <a href="#youtube"><i className="fab fa-youtube"></i></a>
                    </div>
                    <div className="accessibility-tools">
                        <button><i className="fas fa-volume-up"></i></button>
                        <button><i className="fas fa-moon"></i></button>
                        <button><i className="fas fa-font"></i></button>
                        <button><i className="fas fa-plus"></i></button>
                        <button>Support for sign language</button>
                    </div>
                </div>

                {/* Section: Logos */}
                <div className="footer-section logos">
                    <img src="https://www.monshaat.gov.sa/themes/eportal2_new/assets/imgs/m_Logo.png" alt="Monsha'at Logo" />
                    <img src="https://www.monshaat.gov.sa/themes/eportal2_new/assets/imgs/vision-logo-2030-color.svg" alt="Vision 2030 Logo" />
                </div>
                <p>© 2024 c-mass. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
