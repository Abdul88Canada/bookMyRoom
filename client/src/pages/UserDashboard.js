import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/user/UserContext";
import http from "../frameworks/basic-rest/http";
import { API_ENDPOINTS } from "../frameworks/basic-rest/api-endpoints";
import "../assets/css/UserDashboard.css";

const UserDashboard = () => {
  const { user } = useContext(UserContext);
  const [locations, setLocations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch available locations from the API
    const fetchLocations = async () => {
      try {
        const response = await http.get(`${API_ENDPOINTS.LOCATION}`); // Adjust the endpoint based on your backend
        setLocations(response.data);
      } catch (error) {
        console.error("Failed to fetch locations:", error);
      }
    };

    fetchLocations();
  }, []);

  const handleLocationClick = (locationId) => {
    navigate(`/app/location/${locationId}`);
  };

  return (
    <div className="user-dashboard">
      <div className="welcome-banner">
        <h1>Welcome, {user?.name || "User"}!</h1>
        <p>Select a location to start booking shared rooms.</p>
      </div>
      <div className="location-list">
        {locations.map((location) => (
          <div
            key={location._id}
            className="location-card"
            onClick={() => handleLocationClick(location._id)}
          >
            <img src={location.image || "/placeholder.jpg"} alt={location.name} />
            <h2>{location.name}</h2>
            <p>{location.address}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserDashboard;
