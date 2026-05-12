const { Queue } = require('bullmq');

const Redis = require('ioredis');

const connection = new Redis(process.env.REDIS_URL, { maxRetriesPerRequest: null,tls:{} });

const deploymentQueue = new Queue('deploymentQueue', {
  connection
});

module.exports = deploymentQueue;