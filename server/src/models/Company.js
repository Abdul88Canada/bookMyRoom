import mongoose from 'mongoose';

const companySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    companyId: { type: String, required: true, unique: true }, // 4-digit unique ID
    createdAt: { type: Date, default: Date.now },
    logo: {type: String}
});

const Company = mongoose.model('mrb_Company', companySchema);

export default Company;
