const mongoose = require('mongoose');

const monitoringLogSchema = new mongoose.Schema({

  serviceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service'
  },

  status: String,

  responseTime: Number,

  checkedAt: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model(
  'MonitoringLog',
  monitoringLogSchema
);