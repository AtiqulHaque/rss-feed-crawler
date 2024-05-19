const express = require('express');
const rateLimit = require('./../../middlewares/rateLimiter');
const {
    validationHandler,
    campaignAddValidators,
    campaignActiveValidators,
} = require('../validators/CampaignValidators');
// internal imports
const { addCampaign, updateCampaign } = require('../controllers/CampaignController');

const router = express.Router();

router.post(
    '/add',
    rateLimit.CampaignAddLimitMiddleware,
    campaignAddValidators,
    validationHandler,
    addCampaign
);

router.get(
    '/active/:campaignId',
    rateLimit.CampaignAddLimitMiddleware,
    campaignActiveValidators,
    validationHandler,
    updateCampaign
);

module.exports = router;
