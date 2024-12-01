import React, { useState, useEffect } from "react";
import "../assets/css/AddRoomModal.css";
import http from "../frameworks/basic-rest/http";
import { API_ENDPOINTS } from "../frameworks/basic-rest/api-endpoints";

const AddRoomModal = ({ onClose, onSave }) => {
    const [formData, setFormData] = useState({
        name: "",
        location: "",
        capacity: "",
        amenities: [],
        availableSlots: [],
    });

    const [locations, setLocations] = useState([]);
    const [loadingLocations, setLoadingLocations] = useState(true);
    const [newAmenity, setNewAmenity] = useState("");
    const [days, setDays] = useState({
        Monday: false,
        Tuesday: false,
        Wednesday: false,
        Thursday: false,
        Friday: false,
        Saturday: false,
        Sunday: false,
    });

    useEffect(() => {
        // Fetch locations from the database
        const fetchLocations = async () => {
            try {
                const response = await http.get(API_ENDPOINTS.LOCATION);
                setLocations(response.data);
                setLoadingLocations(false);
            } catch (error) {
                console.error("Failed to fetch locations", error);
                setLoadingLocations(false);
            }
        };

        fetchLocations();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAddAmenity = () => {
        if (newAmenity.trim() !== "" && !formData.amenities.includes(newAmenity.trim())) {
            setFormData({
                ...formData,
                amenities: [...formData.amenities, newAmenity.trim()],
            });
            setNewAmenity("");
        }
    };

    const handleRemoveAmenity = (index) => {
        const updatedAmenities = [...formData.amenities];
        updatedAmenities.splice(index, 1);
        setFormData({ ...formData, amenities: updatedAmenities });
    };

    const handleDayToggle = (day) => {
        setDays((prevDays) => ({
            ...prevDays,
            [day]: !prevDays[day],
        }));
    };

    const handleSave = async () => {
        const generateSlots = () => {
            const slots = [];
            for (let hour = 8; hour < 22; hour++) {
                slots.push(`${hour}:00-${hour + 1}:00`);
            }
            return slots;
        };
    
        const availableSlots = Object.keys(days)
            .filter((day) => days[day])
            .map((day) => ({
                day,
                slots: generateSlots(),
            }));
    
        if (!formData.name || !formData.location || !formData.capacity) {
            alert("Please fill in all required fields!");
            return;
        }
    
        try {
            const roomData = {
                name: formData.name,
                location: formData.location,
                capacity: parseInt(formData.capacity, 10),
                amenities: formData.amenities,
                availableSlots,
            };
    
            // Make a POST request to save the room
            const response = await http.post(API_ENDPOINTS.ADMIN_CREATE_ROOM, roomData);
    
            if (response.status === 201) {
                alert("Room added successfully!");
                //onSave(); // Call parent component's save handler
            } else {
                console.error("Failed to save room", response);
                alert("Failed to save the room. Please try again.");
            }
        } catch (error) {
            console.error("Error saving room:", error);
            alert("An error occurred while saving the room.");
        }
    };
    

    return (
        <div className="modal-overlay">
            <div className="adds-modal-content">
                <h2>Add New Room</h2>
                <div className="form-container">
                    <div className="form-group">
                        <label>Room Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Enter room name"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Location</label>
                        {loadingLocations ? (
                            <p>Loading locations...</p>
                        ) : (
                            <select
                                name="location"
                                value={formData.location}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Select a location</option>
                                {locations.map((location) => (
                                    <option key={location._id} value={location._id}>
                                        {location.city.name} - {location.name}
                                    </option>
                                ))}
                            </select>
                        )}
                    </div>
                    <div className="form-group">
                        <label>Capacity</label>
                        <input
                            type="number"
                            name="capacity"
                            value={formData.capacity}
                            onChange={handleInputChange}
                            placeholder="Enter capacity"
                            required
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label>Amenities</label>
                    <div className="amenities-input">
                        <input
                            type="text"
                            value={newAmenity}
                            onChange={(e) => setNewAmenity(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault();
                                    handleAddAmenity();
                                }
                            }}
                            placeholder="Add an amenity"
                        />
                    </div>
                    <div className="amenities-list">
                        {formData.amenities.map((amenity, index) => (
                            <span key={index} className="amenity-tag">
                                {amenity}
                                <button className="remove-amenities" onClick={() => handleRemoveAmenity(index)}>&times;</button>
                            </span>
                        ))}
                    </div>
                </div>
                <div className="days-checkboxes">
                    <p className="section-title">Select Days</p>
                    <div className="days-grid">
                        {Object.keys(days).map((day) => (
                            <div key={day} className="day-item">
                                <label className="day-label">
                                    <input
                                        type="checkbox"
                                        checked={days[day]}
                                        onChange={() => handleDayToggle(day)}
                                    />
                                    <span className="day-name">{day}</span>
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="modal-actions">
                    <button className="save-button" onClick={handleSave}>
                        Save
                    </button>
                    <button className="cancel-button" onClick={onClose}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddRoomModal;
