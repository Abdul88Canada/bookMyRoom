import React, { useState, useEffect } from 'react';
import '../assets/css/SchedulePage.css';
import http from '../frameworks/basic-rest/http'; // Adjust import based on your project
import { API_ENDPOINTS } from '../frameworks/basic-rest/api-endpoints';

const UserSchedulePage = () => {
    const [bookings, setBookings] = useState([]);
    const getSundayOfCurrentWeek = () => {
        const today = new Date();
        const dayOfWeek = today.getDay(); // 0 for Sunday, 1 for Monday, ..., 6 for Saturday
        const sunday = new Date(today);
        sunday.setDate(today.getDate() - dayOfWeek); // Subtract days to get Sunday
        sunday.setHours(0, 0, 0, 0); // Reset time to midnight
        return sunday;
    };
    
    const [weekStart, setWeekStart] = useState(getSundayOfCurrentWeek());
    const timeSlots = Array.from({ length: 14 }, (_, i) => `${8 + i}:00-${9 + i}:00`);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const startDate = new Date(weekStart);
                const endDate = new Date(weekStart);
                endDate.setDate(startDate.getDate() + 4); // Sunday to Thursday

                const response = await http.get(API_ENDPOINTS.BOOKINGS_BY_COMPANY, {
                    params: {
                        startDate: startDate.toISOString(),
                        endDate: endDate.toISOString(),
                    },
                });

                setBookings(response.data);
            } catch (error) {
                console.error('Failed to fetch bookings:', error);
            }
        };

        fetchBookings();
    }, [weekStart]);

    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'];

    const handlePrevWeek = () => {
        setWeekStart((prev) => {
            const newDate = new Date(prev);
            newDate.setDate(newDate.getDate() - 7);
            return newDate;
        });
    };

    const handleNextWeek = () => {
        setWeekStart((prev) => {
            const newDate = new Date(prev);
            newDate.setDate(newDate.getDate() + 7);
            return newDate;
        });
    };

    const getBookingsForDay = (day) => {
        const dayIndex = daysOfWeek.indexOf(day); // Get the index of the day
        return bookings.filter((booking) => {
            const bookingDate = new Date(booking.date);
            return bookingDate.getDay() === dayIndex; // Match the day index
        });
    };

    return (
        <div className="schedule-page">
            <div className="schedule-header">
                <button className="nav-button" onClick={handlePrevWeek}>
                    <i className="fas fa-chevron-left"></i>
                </button>
                <div className="date-display">
                    {/* <button className="today-button" onClick={handleToday}>
                        Today
                    </button> */}
                    <span className="current-week">
                        {weekStart.toLocaleDateString("en-US", { month: "short", day: "numeric" })} -{" "}
                        {new Date(weekStart.getTime() + 4 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </span>
                </div>
                <button className="nav-button" onClick={handleNextWeek}>
                    <i className="fas fa-chevron-right"></i>
                </button>
            </div>

            <div className="schedule-grid">
                <div className="time-column">
                    <h3>Time</h3>
                    {timeSlots.map((slot, index) => (
                        <div key={index} className="time-slot">
                            {slot}
                        </div>
                    ))}
                </div>
                {daysOfWeek.map((day) => (
                    <div key={day} className="day-column">
                        <h3>{day}</h3>
                        {timeSlots.map((slot, index) => {
                            const bookingsForDay = getBookingsForDay(day);
                            const booking = bookingsForDay.find((b) => {
                                return b.slot === slot
                            });
                            return (
                                <div
                                    key={index}
                                    className={`time-slot ${booking ? 'booked' : ''}`}
                                    title={booking ? `${booking.name} - ${booking.room.name} (${booking.room.location.name})` : ''} // Tooltip content
                                >
                                    {booking ? `${booking.name} (${booking.room.location.name}, ${booking.room.name})` : ''} {/* Display booking info */}
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserSchedulePage;
