import Company from '../models/Company.js';

// Generate a unique 4-digit ID
const generateUniqueCompanyId = async () => {
    let uniqueId;
    let isUnique = false;

    while (!isUnique) {
        uniqueId = Math.floor(1000 + Math.random() * 9000).toString(); // Generate a 4-digit number
        const existingCompany = await Company.findOne({ companyId: uniqueId });
        if (!existingCompany) {
            isUnique = true;
        }
    }

    return uniqueId;
};

// Add a new company
export const addCompany = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ message: "Company name is required." });
        }

        // Check if the company name already exists
        const existingCompany = await Company.findOne({ name });
        if (existingCompany) {
            return res.status(409).json({ message: "Company name already exists." });
        }

        // Generate a unique company ID
        const companyId = await generateUniqueCompanyId();

        // Create a new company
        const company = new Company({ name, companyId });
        await company.save();

        res.status(201).json({ message: "Company added successfully.", company });
    } catch (error) {
        console.error("Error adding company:", error);
        res.status(500).json({ message: "Server error.", error });
    }
};

// Get all companies
export const getCompanies = async (req, res) => {
    try {
        const companies = await Company.find().sort({ createdAt: -1 });
        res.status(200).json(companies);
    } catch (error) {
        console.error("Error fetching companies:", error);
        res.status(500).json({ message: "Server error.", error });
    }
};

// Get company by ID
export const getCompanyById = async (req, res) => {
    try {
        const { id } = req.params;
        const company = await Company.findById(id);

        if (!company) {
            return res.status(404).json({ message: "Company not found." });
        }

        res.status(200).json(company);
    } catch (error) {
        console.error("Error fetching company:", error);
        res.status(500).json({ message: "Server error.", error });
    }
};

// Delete company
export const deleteCompany = async (req, res) => {
    try {
        const { id } = req.params;

        const company = await Company.findByIdAndDelete(id);

        if (!company) {
            return res.status(404).json({ message: "Company not found." });
        }

        res.status(200).json({ message: "Company deleted successfully." });
    } catch (error) {
        console.error("Error deleting company:", error);
        res.status(500).json({ message: "Server error.", error });
    }
};

  