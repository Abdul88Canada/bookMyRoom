import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";
import http from "../../frameworks/basic-rest/http";
import { toast } from "react-toastify";
import UserContext from "../../contexts/user/UserContext";
import Cookies from 'js-cookie';

const AdminLogin = () => {
    const { signIn } = useContext(UserContext);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAdminLogin = async () => {
        if (!formData.email || !formData.password) {
            toast.error("Please fill in all required fields.");
            return;
        }

        try {
            setIsSubmitting(true);
            const response = await http.post("/auth/admin/login", formData);
            toast.success("Admin login successful!");
            const { admin, token } = response.data;
            signIn(admin);
            Cookies.set('auth_token', token, { expires: 7 });

            // Redirect to the admin dashboard
            navigate("/admin/dashboard");
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
                <h2>Admin Login</h2>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your admin email"
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
                    onClick={handleAdminLogin}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Logging in..." : "Log In"}
                </button>
                <div className="auth-footer">
                    <Link to="/admin/signup">Don't have an admin account? Sign up here</Link>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
