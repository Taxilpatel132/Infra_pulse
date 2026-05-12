const deploymentService =
   require('../services/deploymentService');

const createDeployment = async (
   req,
   res
) => {

   try {

      const { serviceId, repoUrl } = req.body;
      const userId = req.user.id; // From auth middleware

      const deployment =
         await deploymentService.createDeployment(
            userId,
            serviceId,
            repoUrl
         );

      res.status(201).json({
         message: 'Deployment started',
         deployment
      });

   } catch(error) {

      console.log(error);

      res.status(500).json({
         message: 'Deployment failed'
      });

   }

};

const getDeployments = async (req, res) => {
   try {
      const deployments = await deploymentService.getDeployments(req.user.id);
      
      const formattedDeployments = deployments.map(dep => ({
         id: dep._id,
         status: dep.status,
         createdAt: dep.createdAt,
         repoUrl: dep.repoUrl
      }));

      res.status(200).json(formattedDeployments);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

const getDeploymentDetails = async (req, res) => {
   try {
      const deployment = await deploymentService.getDeploymentDetails(req.params.id, req.user.id);
      
      res.status(200).json({
         buildLogs: deployment.buildLogs,
         repoUrl: deployment.repoUrl,
         status: deployment.status
      });
   } catch (error) {
      res.status(404).json({ message: error.message });
   }
};

module.exports = {
   createDeployment,
   getDeployments,
   getDeploymentDetails
};