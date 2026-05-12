const express = require('express');
const { createService, getServices, deleteService, checkHealth, getServiceLogs } = require('../controllers/serviceController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
    .post(protect, createService)
    .get(protect, getServices);

router.route('/:id')
    .delete(protect, deleteService);

router.route('/:id/health')
    .get(protect, checkHealth)
    .post(protect, checkHealth);

router.route('/:id/logs')
    .get(protect, getServiceLogs);

module.exports = router;