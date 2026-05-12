const Deployment = require('../models/Deployment');

const deploymentQueue =
   require('../queues/deploymentQueue');

const createDeployment = async (
   userId,
   serviceId,
   repoUrl
) => {

   // create deployment record
   const deployment =
      await Deployment.create({

         userId,
         serviceId,
         repoUrl

      });

   // add job to queue
   await deploymentQueue.add(

      'deploy-service',

      {
         deploymentId: deployment._id
      }

   );

   return deployment;

};

const getDeployments = async (userId) => {
   return await Deployment.find({ userId }).sort({ createdAt: -1 });
};

const getDeploymentDetails = async (deploymentId, userId) => {
   const deployment = await Deployment.findOne({ _id: deploymentId, userId });
   if (!deployment) {
      throw new Error('Deployment not found or unauthorized');
   }
   return deployment;
};

module.exports = {
   createDeployment,
   getDeployments,
   getDeploymentDetails
};