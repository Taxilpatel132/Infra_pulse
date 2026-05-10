const { Worker } = require('bullmq');
const MonitoringLog = require('../models/MonitoringLog');
const Redis = require('ioredis');
//console.log('Worker connecting to Redis...', process.env.REDIS_URL);
const connection = new Redis(process.env.REDIS_URL, { maxRetriesPerRequest: null });

const Service = require('../models/Service');

const checkHealth = require('../utils/healthCheck');
console.log('Worker started...');
const worker = new Worker(

  'monitorQueue',

  async (job) => {
    
    const { serviceId } = job.data;

    const service = await Service.findById(serviceId);
    //console.log('Service found:', service);
    if (!service) return;

    const healthResult = await checkHealth(service.url);
   
    service.status = healthResult.status;

    service.lastChecked = new Date();
    console.log('Health check result:', healthResult);
    await service.save();
    console.log('Service updated with new status:', service);
    await MonitoringLog.create({
       serviceId: service._id,
       status: healthResult.status,
       responseTime: healthResult.responseTime
    });
    console.log(`${service.name}: ${healthResult.status}`);

  },

  { connection }

);