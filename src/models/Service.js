const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

  name: String,

  url: String,

  status: {
    type: String,
    default: 'UNKNOWN'
  },

  responseTime: Number,

  lastChecked: Date

});

module.exports = mongoose.model('Service', serviceSchema);