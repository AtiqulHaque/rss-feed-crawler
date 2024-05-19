const { body, param, validationResult } = require('express-validator');

const Response = require('../../utilities/response');

let campaignAddValidators = [
    body('name', 'Campaign name is required').isLength({ min: 5 }).trim().not().isEmpty(),
    body('feed_url', 'Campaign Rss feed url is required').isURL().trim().not().isEmpty(),
    body('run_frequency', 'Campaign Running requency required').trim().not().isEmpty(),
    body('max_running_time', 'Campaign Max Runnign time is required').trim().not().isEmpty(),
];

let campaignActiveValidators = [
    param('campaignId', 'Campaign id is required')
        .isLength({ max: 25 })
        .withMessage('Maximum character limit is 32')
        .trim()
        .not()
        .isEmpty(),
];

const validationHandler = function (req, res, next) {
    const errors = validationResult(req);
    const mappedErrors = errors.mapped();
    if (Object.keys(mappedErrors).length === 0) {
        next();
    } else {
        res.status(400).json(Response.validationError(mappedErrors, Response.startTime));
    }
};
module.exports = {
    validationHandler,
    campaignActiveValidators,
    campaignAddValidators,
};
