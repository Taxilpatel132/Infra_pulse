const { Worker } = require('bullmq');
const MonitoringLog = require('../models/MonitoringLog');
const Redis = require('ioredis');

const connection = new Redis(process.env.REDIS_URL, { maxRetriesPerRequest: null });

const Service = require('../models/Service');

const checkHealth = require('../utils/healthCheck');
console.log('Worker started...');
const worker = new Worker(

  'monitorQueue',

  async (job) => {
    
    const { serviceId } = job.data;

    const service = await Service.findById(serviceId);
    
    if (!service) return;

    const healthResult = await checkHealth(service.url);
   
    service.status = healthResult.status;

    service.lastChecked = new Date();
   
    await service.save();
   
    await MonitoringLog.create({
       serviceId: service._id,
       status: healthResult.status,
       responseTime: healthResult.responseTime
    });
    console.log(`${service.name}: ${healthResult.status}`);

  },

  { connection }

);