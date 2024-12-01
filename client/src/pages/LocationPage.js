import React, { useState, useEffect } from "react";
import RoomCard from "../components/RoomCard";
import Filters from "../components/Filters";
import { useParams } from "react-router-dom";
import "../assets/css/LocationPage.css";
import http from "../frameworks/basic-rest/http";
import { API_ENDPOINTS } from "../frameworks/basic-rest/api-endpoints";
import BookingModal from "../components/BookingModal";

const LocationPage = () => {
    const { locationId } = useParams();
    const [rooms, setRooms] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState(null);
    
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
    });

    useEffect(() => {
        // Fetch rooms from API
        const fetchRooms = async () => {
            try {
                const response = await http.get(`${API_ENDPOINTS.GET_ROOMS}/${locationId}`);
                setRooms(response.data);
            } catch (error) {
                console.error("Failed to fetch rooms", error);
            }
        };
        fetchRooms();
    }, [locationId]);

    const handleBookClick = (room) => {
        setSelectedRoom(room);
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
    };



    return (
        <div className="location-page">
            <h1>{rooms[0]?.location.name} Meeting Rooms</h1>
            <Filters
                date={""}
                setDate={() => {}}
                time={""}
                setTime={() => {}}
                location={""}
                setLocation={() => {}}
            />
            <div className="room-list">
                {rooms.length > 0 ? (
                    rooms.map((room) => (
                        <RoomCard key={room._id} room={room} onBook={() => handleBookClick(room)} />
                    ))
                ) : (
                    <p>No rooms available for the selected criteria.</p>
                )}
            </div>

            {showModal && (
                <BookingModal
                    room={selectedRoom}
                    onClose={handleModalClose}
                    
                />
            )}
        </div>
    );
};

export default LocationPage;
