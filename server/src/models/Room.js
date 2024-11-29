import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: mongoose.Schema.Types.ObjectId, ref: 'Location', required: true },
    capacity: { type: Number, required: true },
    amenities: [{ type: String }],
    availableSlots: [
        {
            day: { type: String, required: true }, // e.g., Monday, Tuesday
            slots: [{ type: String }], // e.g., "09:00-10:00", "10:00-11:00"
        }
    ],
    createdAt: { type: Date, default: Date.now },
});
const Room = mongoose.model('Room', roomSchema);

export default Room;