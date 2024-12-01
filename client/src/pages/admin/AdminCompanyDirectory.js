import React, { useState, useEffect } from "react";
import http from "../../frameworks/basic-rest/http";
import { API_ENDPOINTS } from "../../frameworks/basic-rest/api-endpoints";
import { toast } from "react-toastify";
import "../../assets/css/CompanyDirectory.css";

const AdminCompanyDirectory = () => {
    const [companies, setCompanies] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
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
            setIsModalOpen(false);
            setNewCompany({ name: "" });
        } catch (error) {
            toast.error(`Failed to add company: ${error.response?.data?.message || error.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="company-directory">
            <div className="header">
                <h1>Company Directory</h1>
                <button className="add-button" onClick={() => setIsModalOpen(true)}>
                    + Add Company
                </button>
            </div>
            <div className="company-list">
                {companies.length > 0 ? (
                    companies.map((company) => (
                        <div key={company._id} className="company-card">
                            <h3>{company.name}</h3>
                            <p>Company ID: {company.companyId}</p>
                        </div>
                    ))
                ) : (
                    <p>No companies found.</p>
                )}
            </div>

            {isModalOpen && (
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
                            <button className="close-button" onClick={() => setIsModalOpen(false)}>
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
        </div>
    );
};

export default AdminCompanyDirectory;
