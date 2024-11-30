import React, { useState, useEffect } from 'react';
import RoomCard from '../components/RoomCard';
import Filters from '../components/Filters';
import { useParams } from "react-router-dom";
import '../assets/css/LocationPage.css';
import http from '../frameworks/basic-rest/http';
import { API_ENDPOINTS } from "../frameworks/basic-rest/api-endpoints";

const LocationPage = () => {
    const { locationId } = useParams();
    const [rooms, setRooms] = useState([]);
    const [filteredRooms, setFilteredRooms] = useState([]);
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [location, setLocation] = useState('');

    useEffect(() => {
        // Fetch rooms from API
        const fetchRooms = async () => {
            try {
                const response = await http.get(`${API_ENDPOINTS.GET_ROOMS}/${locationId}`);
                setRooms(response.data);
            } catch (error) {
                console.error('Failed to fetch rooms', error);
            }
        };
        fetchRooms();
    }, []);
    // useEffect(() => {
    //     // Filter rooms based on date, time, and location
    //     const filtered = rooms?.filter(
    //         (room) =>
    //             (!date || room.availableDates.includes(date)) &&
    //             (!time || room.availableSlots.includes(time)) &&
    //             (!location || room.location === location)
    //     );
    //     setFilteredRooms(filtered);
    // }, [date, time, location, rooms]);

    const handleBook = (roomId) => {
        alert(`Booked room with ID: ${roomId}`);
    };

    return (
        <div className="location-page">
            <h1>Meeting Rooms</h1>
            <Filters
                date={date}
                setDate={setDate}
                time={time}
                setTime={setTime}
                location={location}
                setLocation={setLocation}
            />
            <div className="room-list">
                {rooms.length > 0 ? (
                    rooms.map((room) => (
                        <RoomCard key={room.id} room={room} onBook={handleBook} />
                    ))
                ) : (
                    <p>No rooms available for the selected criteria.</p>
                )}
            </div>
        </div>
    );
};

export default LocationPage;
