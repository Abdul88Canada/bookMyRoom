import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../Routes/ProtectedRoute";  // Ensure the path to ProtectedRoute is correct
import AdminProtectedRoute from "../Routes/AdminProtectedRoute";
import MainLayout from "../layout/MainLayout";
import AdminMainLayout from "../layout/AdminMainLayout";

import Signup from "../pages/auth/Signup";
import Login from "../pages/auth/Login";
import LandingPage from "../pages/landing/LandingPage";

import LocationPage from "../pages/LocationPage";
import UserDashboard from "../pages/UserDashboard";
import UserCompanyDirectory from "../pages/UserCompanyDirectory";
import UserSchedulePage from "../pages/UserSchedulePage";

import AdminSignup from "../pages/auth/AdminSignup";
import AdminLogin from "../pages/auth/AdminLogin";
import AdminLocationPage from "../pages/admin/AdminLocationPage";
import AdminCompanyDirectory from "../pages/admin/AdminCompanyDirectory";
import AdminSchedulePage from "../pages/admin/AdminSchedulePage";

const Index = () => {
    return (
        <Routes>
            <Route path="/app" element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
                {/* Nested route */}
                <Route path="/app/dashboard" element={<UserDashboard />} />
                <Route path="/app/company-directory" element={<UserCompanyDirectory />} />
                <Route path="/app/location/:locationId" element={<LocationPage />} />
                <Route path="/app/schedule/" element={<UserSchedulePage />} />
            </Route>
            <Route path="/admin" element={<AdminProtectedRoute><AdminMainLayout /></AdminProtectedRoute>}>
                {/* Nested route */}
                <Route path="/admin/dashboard" element={<AdminLocationPage />} />
                <Route path="/admin/company-directory" element={<AdminCompanyDirectory />} />
                <Route path="/admin/schedule" element={<AdminSchedulePage />} />
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
