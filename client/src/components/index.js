import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../Routes/ProtectedRoute";  // Ensure the path to ProtectedRoute is correct

import LocationPage from "../pages/LocationPage";
import MainLayout from "../layout/MainLayout";
import Signup from "../pages/auth/Signup";
import Login from "../pages/auth/Login";
import LandingPage from "../pages/landing/LandingPage";
import AdminSignup from "../pages/auth/AdminSignup";
import AdminLogin from "../pages/auth/AdminLogin";
import AdminLocationPage from "../pages/admin/AdminLocationPage";

const Index = () => {
    return (
        <Routes>
            <Route path="/location" element={<MainLayout />}>
                {/* Nested route */}
                <Route path=":locationId" element={<LocationPage />} />
            </Route>
            <Route path="/admin" element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
                {/* Nested route */}
                <Route path="/admin/dashboard" element={<AdminLocationPage />} />
            </Route>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin/signup" element={<AdminSignup />} />
            <Route path="/admin/login" element={<AdminLogin />} />
        </Routes>
    );
};

export default Index;
