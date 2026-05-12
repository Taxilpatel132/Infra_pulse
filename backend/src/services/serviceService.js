const Service = require('../models/Service');
const MonitoringLog = require('../models/MonitoringLog');
const checkHealth = require('../utils/healthCheck');

const createService = async (userId, serviceData) => {
    const newService = new Service({
        userId,
        name: serviceData.name,
        url: serviceData.url
    });
    return await newService.save();
};

const getUserServices = async (userId) => {
    return await Service.find({ userId });
};

const deleteService = async (serviceId, userId) => {
    const service = await Service.findOne({ _id: serviceId, userId });
    
    if (!service) {
        throw new Error('Service not found or you are not authorized to delete it');
    }

    await Service.deleteOne({ _id: serviceId });
    return true;
};

const checkServiceHealth = async (serviceId, userId) => {
    const service = await Service.findOne({ _id: serviceId, userId });
    
    if (!service) {
        throw new Error('Service not found or you are not authorized to check it');
    }

    const status = await checkHealth(service.url);
    service.status = status;
    await service.save();

    return service;
};

const getServiceLogs = async (serviceId, userId) => {
    const service = await Service.findOne({ _id: serviceId, userId });
    if (!service) {
        throw new Error('Service not found or unauthorized');
    }
    return await MonitoringLog.find({ serviceId }).sort({ checkedAt: -1 }).limit(100);
};

module.exports = { createService, getUserServices, deleteService, checkServiceHealth, getServiceLogs };