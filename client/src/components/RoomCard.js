import React from 'react';

const RoomCard = ({ room, onBook }) => {
    return (
        <div className="room-card">
            <img
                src={room.image || '/placeholder-image.png'}
                alt={room.name}
                className="room-image"
            />
            <div className="room-details">
                <h3>{room.name}</h3>
                <p>{room.location}</p>
                <p>
                    <i className="fas fa-users"></i> {room.capacity} people
                </p>
                <button onClick={() => onBook(room.id)} className="book-button">
                    Book
                </button>
            </div>
        </div>
    );
};

export default RoomCard;
