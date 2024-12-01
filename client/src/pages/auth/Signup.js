import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Auth.css";
import http from "../../frameworks/basic-rest/http";
import { toast } from "react-toastify";

const Signup = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        companyId: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSignup = async () => {
        if (!formData.name || !formData.email || !formData.password || !formData.companyId) {
            toast.error("Please fill in all required fields.");
            return;
        }

        try {
            setIsSubmitting(true);
            await http.post("/api/auth/signup", formData);
            toast.success("Signup successful!");
            // Redirect to login page
        } catch (error) {
            toast.error(`Signup failed: ${error.response?.data?.message || error.message}`);
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
                <h2>Sign up</h2>
                <div className="form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your name"
                        required
                    />
                </div>
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
                <div className="form-group">
                    <label>Company ID</label>
                    <input
                        type="text"
                        name="companyId"
                        value={formData.companyId}
                        onChange={handleInputChange}
                        placeholder="Enter your company ID"
                        required
                    />
                </div>
                <button
                    className="auth-submit-button"
                    onClick={handleSignup}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Signing up..." : "Sign Up"}
                </button>
                <div className="auth-footer">
                    <Link to="/login">Already have an account? Log in here</Link>
                </div>
            </div>
        </div>
    );
};

export default Signup;
