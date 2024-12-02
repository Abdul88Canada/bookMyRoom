import React from 'react';

const AdminRoomCard = ({ room, onBook }) => {
    return (
        <div className="room-card">
            <img
                src={room.image || '/placeholder-image.png'}
                alt={room.name}
                className="room-image"
            />
            <div className="room-details">
                <h3>{room.name}</h3>
                <p>
                    <i className="fas fa-users"></i> {room.capacity} people
                </p>
                {/* Amenities as tags */}
                <div className="room-amenities">
                    {room.amenities?.map((amenity, index) => (
                        <span key={index} className="amenity-tag">
                            {amenity}
                        </span>
                    ))}
                </div>
                <button onClick={() => onBook(room._id)} className="book-button">
                    Edit
                </button>
            </div>
        </div>
    );
};

export default AdminRoomCard;
