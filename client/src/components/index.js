import React from "react";
import { Routes, Route } from "react-router-dom";
import LocationPage from "../pages/LocationPage";
import MainLayout from "../layout/MainLayout";

const Index = () => {
    return (
        <Routes>
            <Route path="/location" element={<MainLayout />}>
                {/* Nested route */}
                <Route path=":locationId" element={<LocationPage />} />
            </Route>
        </Routes>
    );
};

export default Index;
