import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    date: { type: Date, required: true },
    slot: { type: String, required: true }, // e.g., "09:00-10:00"
    createdAt: { type: Date, default: Date.now },
    name: {type: String},
    phone: {type: String},
    email: {type: String},
    company: {type: String}
});

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;