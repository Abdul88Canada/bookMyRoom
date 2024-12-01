import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'user', 'full-admin'], default: 'user' },
    createdAt: { type: Date, default: Date.now },
    companyId: { type: String, required: true}
});

const User = mongoose.model('mrb_User', userSchema);

export default User;