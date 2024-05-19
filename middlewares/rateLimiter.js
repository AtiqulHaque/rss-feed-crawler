const setRateLimit = require('express-rate-limit');
const app_settings = require('./../settings/app');

/** @type {*} */

// Middleware for limiting upload requests
const CampaignAddLimitMiddleware = setRateLimit({
    windowMs: 1440 * 60 * 1000, // 24 hours in milliseconds
    max: app_settings.perday_upload_limit, // Maximum number of upload requests allowed per day
    message: {
        status: 'error',
        data: `You have exceeded your campaign add request per day limit.`,
    },
    headers: true, // Include rate limit headers in the response
});

module.exports = {
    CampaignAddLimitMiddleware,
};
