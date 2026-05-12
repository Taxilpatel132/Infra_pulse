const express = require('express');

const router = express.Router();

const { protect } = require('../middleware/authMiddleware');
const deploymentController =
   require('../controllers/deploymentController');

router.post(
   '/',
   protect,
   deploymentController.createDeployment
);

router.get(
   '/',
   protect,
   deploymentController.getDeployments
);

router.get(
   '/:id',
   protect,
   deploymentController.getDeploymentDetails
);

module.exports = router;