import React, { useState, useEffect } from "react";
import http from "../../frameworks/basic-rest/http";
import { API_ENDPOINTS } from "../../frameworks/basic-rest/api-endpoints";
import { toast } from "react-toastify";
import "../../assets/css/CompanyDirectory.css";

const AdminCompanyDirectory = () => {
    const [companies, setCompanies] = useState([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
    const [selectedCompanyDetails, setSelectedCompanyDetails] = useState(null);
    const [newCompany, setNewCompany] = useState({ name: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Fetch all companies
    const fetchCompanies = async () => {
        try {
            const response = await http.get(`${API_ENDPOINTS.ADMIN_GET_COMPANY}`);
            setCompanies(response.data);
        } catch (error) {
            toast.error("Failed to fetch companies.");
        }
    };

    useEffect(() => {
        fetchCompanies();
    }, []);

    // Handle Add Company
    const handleAddCompany = async () => {
        if (!newCompany.name.trim()) {
            toast.error("Company name is required.");
            return;
        }

        try {
            setIsSubmitting(true);
            const response = await http.post(API_ENDPOINTS.ADMIN_ADD_COMPANY, newCompany);
            setCompanies([...companies, response.data.company]);
            toast.success("Company added successfully!");
            setIsAddModalOpen(false);
            setNewCompany({ name: "" });
        } catch (error) {
            toast.error(`Failed to add company: ${error.response?.data?.message || error.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Handle Fetch Company Details
    const handleCompanyClick = async (companyId) => {
        try {
            const response = await http.get(`${API_ENDPOINTS.ADMIN_GET_COMPANY}/${companyId}`);
            setSelectedCompanyDetails(response.data);
            setIsDetailsModalOpen(true);
        } catch (error) {
            toast.error(`Failed to fetch company details: ${error.response?.data?.message || error.message}`);
        }
    };

    return (
        <div className="company-directory">
            <div className="header">
                <h1>Company Directory</h1>
                <button className="add-button" onClick={() => setIsAddModalOpen(true)}>
                    + Add Company
                </button>
            </div>
            <div className="company-list">
                {companies.length > 0 ? (
                    companies.map((company) => (
                        <div
                            key={company._id}
                            className="company-card"
                            onClick={() => handleCompanyClick(company._id)}
                        >
                            <h3>{company.name}</h3>
                            <p>Company ID: {company.companyId}</p>
                        </div>
                    ))
                ) : (
                    <p>No companies found.</p>
                )}
            </div>

            {/* Add Company Modal */}
            {isAddModalOpen && (
                <div className="modal-overlay">
                    <div className="cdmodal">
                        <h2>Add Company</h2>
                        <div className="form-group">
                            <label>Company Name</label>
                            <input
                                type="text"
                                value={newCompany.name}
                                onChange={(e) => setNewCompany({ name: e.target.value })}
                                placeholder="Enter company name"
                                required
                            />
                        </div>
                        <div className="modal-actions">
                            <button className="close-button" onClick={() => setIsAddModalOpen(false)}>
                                Cancel
                            </button>
                            <button
                                className="submit-button"
                                onClick={handleAddCompany}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Adding..." : "Add"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Company Details Modal */}
            {isDetailsModalOpen && selectedCompanyDetails && (
                <div className="modal-overlay">
                    <div className="cdmodal">
                        <h2>{selectedCompanyDetails.company.name}</h2>
                        <p>Company ID: {selectedCompanyDetails.company.companyId}</p>
                        <p>Created At: {new Date(selectedCompanyDetails.company.createdAt).toLocaleDateString()}</p>
                        <h3>Users</h3>
                        <ul>
                            {selectedCompanyDetails.users.map((user) => (
                                <li key={user._id}>
                                    {user.name} - {user.email}
                                </li>
                            ))}
                        </ul>
                        <div className="modal-actions">
                            <button className="close-button" onClick={() => setIsDetailsModalOpen(false)}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminCompanyDirectory;
