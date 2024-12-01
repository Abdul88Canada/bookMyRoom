import React from "react";
import { Routes, Route } from "react-router-dom";
import LocationPage from "../pages/LocationPage";
import MainLayout from "../layout/MainLayout";
import Signup from "../pages/auth/Signup";
import Login from "../pages/auth/Login";
import LandingPage from "../pages/landing/LandingPage";

const Index = () => {
    return (
        <Routes>
            <Route path="/location" element={<MainLayout />}>
                {/* Nested route */}
                <Route path=":locationId" element={<LocationPage />} />
            </Route>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    );
};

export default Index;
