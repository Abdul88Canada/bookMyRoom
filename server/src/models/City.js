import mongoose from 'mongoose';

const citySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now },
});

const City = mongoose.model('City', citySchema);

export default City;