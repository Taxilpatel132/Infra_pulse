const serviceService = require('../services/serviceService');

const createService = async (req, res) => {
    try {
        const { name, url } = req.body;
        if (!name || !url) {
            return res.status(400).json({ success: false, message: 'Please provide name and url' });
        }
        
        const service = await serviceService.createService(req.user.id, { name, url });
        res.status(201).json({ success: true, data: service });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getServices = async (req, res) => {
    try {
        const services = await serviceService.getUserServices(req.user.id);
        res.status(200).json({ success: true, data: services });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const deleteService = async (req, res) => {
    try {
        await serviceService.deleteService(req.params.id, req.user.id);
        res.status(200).json({ success: true, message: 'Service deleted successfully' });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const checkHealth = async (req, res) => {
    try {
        const service = await serviceService.checkServiceHealth(req.params.id, req.user.id);
        res.status(200).json({ success: true, data: service });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

module.exports = { createService, getServices, deleteService, checkHealth };