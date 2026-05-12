const express = require('express');

const router = express.Router();

const analyticsController =
   require('../controllers/analyticsController');

router.get(

   '/services/:id/analytics',

   analyticsController.getServiceAnalytics

);

module.exports = router;