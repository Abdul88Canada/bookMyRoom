import React from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";
import Footer from "./Footer";

const LandingPage = () => {
    const navigate = useNavigate();

    const handleSignupRedirect = () => {
        navigate("/signup");
    };

    const handleLoginRedirect = () => {
        navigate("/login");
    };

    return (
        <div className="landing-container">
            {/* Top Navigation */}
            <nav className="top-nav">
                <div className="logo" onClick={() => navigate("/")}>
                    <div className="logo">
                        <img src="https://www.monshaat.gov.sa/themes/eportal2_new/assets/imgs/m_Logo.png" alt="Logo" />
                    </div>
                </div>
                <button className="login-button" onClick={handleLoginRedirect}>
                    Login
                </button>
            </nav>

            {/* Header Section */}
            <header className="landing-header">
                <div className="header-content">
                    <div className="header-text">
                        <h1>Powering Flexible Working</h1>
                        <p>
                            Your one-stop solution for small and mid-size businesses to book shared meeting rooms and office spaces offered by <img class="mon-icon" src="https://www.monshaat.gov.sa/themes/eportal2_new/assets/imgs/m_Logo.png" alt="Logo" />.
                        </p>
                        <div className="landing-buttons">
                            <button className="cta-button" onClick={handleSignupRedirect}>
                                Get Started
                            </button>
                            <button className="secondary-button" onClick={handleLoginRedirect}>
                                Login
                            </button>
                        </div>
                    </div>
                    <div className="header-image">
                        <img
                            src="https://cdn-jdbmd.nitrocdn.com/yEMHtyTSADNOgebFqynalakIQNihDGqu/assets/images/optimized/rev-1cca927/www.officernd.com/wp-content/themes/officernd/assets/hp/homepage-hero.svg"
                            alt="Flexible working illustration"
                        />
                    </div>
                </div>
            </header>


            {/* Steps Section */}
            <section className="landing-steps">
                <div className="steps-header">
                    <div className="header-image">
                        <img
                            src="https://cdn-jdbmd.nitrocdn.com/yEMHtyTSADNOgebFqynalakIQNihDGqu/assets/images/optimized/rev-1cca927/www.officernd.com/wp-content/themes/officernd/assets/hp/customer-support.svg"
                            alt="Customer support illustration"
                        />
                    </div>
                    <h2>This is how you can use this platform</h2>
                </div>
                <div className="steps-container">
                    <div className="step">
                        <div className="step-icon">
                            <i className="fas fa-check-circle"></i>
                        </div>
                        <div className="step-content">
                            <h3>Register with Monshaat</h3>
                            <p>Get started by registering with Monshaat to access shared meeting rooms and office spaces.</p>
                        </div>
                    </div>
                    <div className="step">
                        <div className="step-icon">
                            <i className="fas fa-id-card"></i>
                        </div>
                        <div className="step-content">
                            <h3>Get Your Company ID</h3>
                            <p>Monshaat will assign your startup a unique Company ID that allows you to book resources on our platform.</p>
                        </div>
                    </div>
                    <div className="step">
                        <div className="step-icon">
                            <i className="fas fa-calendar-check"></i>
                        </div>
                        <div className="step-content">
                            <h3>Sign Up and Book</h3>
                            <p>Use your Company ID to sign up and start booking shared rooms tailored to your needs.</p>
                        </div>
                    </div>
                </div>
            </section>


            <Footer />


        </div>
    );
};

export default LandingPage;
