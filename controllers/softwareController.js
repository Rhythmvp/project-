const Software = require('../models/softwareModel');

const getSoftware = async (req, res) => {
    try {
        const software = await Software.find();
        res.json(software);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createSoftware = async (req, res) => {
    const newSoftware = new Software(req.body);
    try {
        const savedSoftware = await newSoftware.save();
        res.status(201).json(savedSoftware);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateSoftware = async (req, res) => {
    try {
        const updatedSoftware = await Software.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updatedSoftware);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteSoftware = async (req, res) => {
    try {
        await Software.findByIdAndDelete(req.params.id);
        res.json({ message: 'Software deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getSoftware,
    createSoftware,
    updateSoftware,
    deleteSoftware
};
