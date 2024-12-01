import React, { useState, useEffect } from "react";
import RoomCard from "../../components/RoomCard";
import AddRoomModal from "../../components/AddRoomModal";
import "../../assets/css/LocationPage.css";
import http from "../../frameworks/basic-rest/http";
import { API_ENDPOINTS } from "../../frameworks/basic-rest/api-endpoints";

const AdminLocationPage = () => {
    const [rooms, setRooms] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);

    useEffect(() => {
        // Fetch rooms from API
        const fetchRooms = async () => {
            try {
                const response = await http.get(`${API_ENDPOINTS.GET_ALL_ROOMS}`);
                setRooms(response.data);
            } catch (error) {
                console.error("Failed to fetch rooms", error);
            }
        };
        fetchRooms();
    }, []);

    const handleAddRoom = async (roomData) => {
        try {
            const response = await http.post(`${API_ENDPOINTS.ADD_ROOM}`, roomData);
            setRooms((prev) => [...prev, response.data]);
            setShowAddModal(false);
        } catch (error) {
            console.error("Failed to add room", error);
        }
    };

    return (
        <div className="location-page">
            <div className="header-section">
                <h1>All Meeting Rooms</h1>
                <button
                    className="add-button"
                    onClick={() => setShowAddModal(true)}
                >
                    Add Room
                </button>
            </div>
            <div className="room-list">
                {rooms.length > 0 ? (
                    rooms.map((room) => (
                        <RoomCard key={room._id} room={room} />
                    ))
                ) : (
                    <p>No rooms available for the selected criteria.</p>
                )}
            </div>

            {showAddModal && (
                <AddRoomModal
                    onClose={() => setShowAddModal(false)}
                    onSave={handleAddRoom}
                />
            )}
        </div>
    );
};

export default AdminLocationPage;
