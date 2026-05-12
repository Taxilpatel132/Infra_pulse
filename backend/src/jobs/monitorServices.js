const cron = require('node-cron');

const Service = require('../models/Service');

const monitorQueue = require('../queues/monitorQueue');

const startMonitoring = () => {

  cron.schedule('*/1 * * * *', async () => {

    console.log('Adding jobs to queue...');

    const services = await Service.find();

    for (const service of services) {

      await monitorQueue.add('check-health', {
        serviceId: service._id
      },{
        attempts: 1,
      });

    }

  });

};

module.exports = startMonitoring;