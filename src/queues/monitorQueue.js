const { Queue } = require('bullmq');

const Redis = require('ioredis');

const connection = new Redis(process.env.REDIS_URL, { maxRetriesPerRequest: null });

const monitorQueue = new Queue('monitorQueue', {
  connection
});

module.exports = monitorQueue;