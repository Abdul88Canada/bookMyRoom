import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Auth.css";
import http from "../../frameworks/basic-rest/http";
import { toast } from "react-toastify";

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleLogin = async () => {
        if (!formData.email || !formData.password) {
            toast.error("Please fill in all required fields.");
            return;
        }

        try {
            setIsSubmitting(true);
            await http.post("/api/auth/login", formData);
            toast.success("Login successful!");
            // Redirect to dashboard or any other page
        } catch (error) {
            toast.error(`Login failed: ${error.response?.data?.message || error.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
            <div className="logo">
                    <img src="https://www.monshaat.gov.sa/themes/eportal2_new/assets/imgs/m_Logo.png" alt="Logo" />
                </div>
                <h2>Sign in</h2>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Email address to contact you..."
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Enter password"
                        required
                    />
                </div>
                <button
                    className="auth-submit-button"
                    onClick={handleLogin}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Logging in..." : "Log In"}
                </button>
                <div className="auth-footer">
                    <Link to="/signup">Don't have an account? Sign up here</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
