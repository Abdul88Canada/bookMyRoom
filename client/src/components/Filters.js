import React from 'react';

const Filters = ({ date, setDate, time, setTime, location, setLocation }) => {
    return (
        <div className="filters">
            <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
            >
                <option value="First Floor">First Floor</option>
                <option value="Second Floor">Second Floor</option>
                {/* Add more locations */}
            </select>
        </div>
    );
};

export default Filters;
