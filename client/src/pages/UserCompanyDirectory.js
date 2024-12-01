import React, { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/user/UserContext";
import http from "../frameworks/basic-rest/http";
import { API_ENDPOINTS } from "../frameworks/basic-rest/api-endpoints";
import "../assets/css/UserCompanyDirectory.css";

const UserCompanyDirectory = () => {
  const { user } = useContext(UserContext); // Access logged-in user's context
  const [companyUsers, setCompanyUsers] = useState([]);

  useEffect(() => {
    // Fetch all users under the same company
    const fetchCompanyUsers = async () => {
      try {
        const response = await http.get(`${API_ENDPOINTS.USER_COMPANY}`);
        setCompanyUsers(response.data);
      } catch (error) {
        console.error("Failed to fetch company users:", error);
      }
    };

   
      fetchCompanyUsers();

  }, []);

  return (
    <div className="company-directory">
      <div className="header">
        <h1>Company Directory</h1>
        <p>Below is the list of all employees in your company.</p>
      </div>
      <div className="user-list">
        {companyUsers.map((companyUser) => (
          <div key={companyUser._id} className="user-card">
            <div className="user-avatar">
              <i className="fas fa-user"></i>
            </div>
            <div className="user-info">
              <h2>{companyUser.name}</h2>
              <p>{companyUser.companyName}</p>
            </div>
            <div className="user-actions">
              <i className="fas fa-envelope"></i>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserCompanyDirectory;
