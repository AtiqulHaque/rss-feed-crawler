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

/**
 * @swagger
 * components:
 *   schemas:
 *     Campaign:
 *       type: object
 *       required:
 *         - name
 *         - feed_url
 *         - run_frequency
 *         - max_running_time
 *       properties:
 *         name:
 *           type: string
 *           description: Campaign name
 *         feed_url:
 *           type: string
 *           description: Rss feed URL
 *         run_frequency:
 *           type: integer
 *           example: 10
 *           descripton: How many time it will run daily
 *         max_running_time:
 *           type: integer
 *           example: 10
 *           descripton: How much time it will run
 *
 * @swagger
 *  tags:
 *    name: RSS Feed
 *    description: Campaign of RSS Feed
 */

/**
 * @swagger
 * /campain/add:
 *   post:
 *     summary: Add RSS Feed Campaign
 *     tags: [RSS Feed]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Campaign'
 *
 *     responses:
 *        '200':
 *           description: A campaign object.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Campaign'
 *        '400':
 *           description: Something went wrong.
 *        '500':
 *           description: Something went wrong.
 *        default:
 *           description: Unexpected error
 */

router.post(
    '/add',
    rateLimit.CampaignAddLimitMiddleware,
    campaignAddValidators,
    validationHandler,
    addCampaign
);

/**
 * @swagger
 * /campaign/active/:campaignId:
 *   get:
 *     summary: Update campaign status active
 *     tags: [RSS Feed]
 *     parameters:
 *       - in : path
 *         name: campaignId
 *         description: id of campaign
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Campaign info.
 *       404:
 *         description: Campaign is not found
 */

router.get(
    '/active/:campaignId',
    rateLimit.CampaignAddLimitMiddleware,
    campaignActiveValidators,
    validationHandler,
    updateCampaign
);

module.exports = router;
