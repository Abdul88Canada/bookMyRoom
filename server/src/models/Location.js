import mongoose from 'mongoose';

const locationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    city: { type: mongoose.Schema.Types.ObjectId, ref: 'City', required: true },
    createdAt: { type: Date, default: Date.now },
});

const Location = mongoose.model('Location', locationSchema);

export default Location;