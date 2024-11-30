import React from 'react';

const Filters = ({ date, setDate, time, setTime, location, setLocation }) => {
    return (
        <div className="filters">
            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
            />
            <select value={time} onChange={(e) => setTime(e.target.value)}>
                <option value="09:00-09:30">09:00 - 09:30</option>
                <option value="10:00-10:30">10:00 - 10:30</option>
                {/* Add more time slots */}
            </select>
            <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
            >
                <option value="First Floor">First Floor</option>
                {/* Add more locations */}
            </select>
        </div>
    );
};

export default Filters;
