const mongoose = require('mongoose');

const deploymentSchema = new mongoose.Schema({

   userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
   },

   serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Service',
      required: true
   },

   repoUrl: {
      type: String,
      required: true
   },

   status: {
      type: String,
      enum: [
         'PENDING',
         'BUILDING',
         'DEPLOYED',
         'FAILED'
      ],
      default: 'PENDING'
   },

   projectPath: String,

   buildLogs: String,

   createdAt: {
      type: Date,
      default: Date.now
   }

});

module.exports = mongoose.model(
   'Deployment',
   deploymentSchema
);