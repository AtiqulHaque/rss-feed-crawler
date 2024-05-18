const { postMessageToQueue } = require('../../utilities/bullmq'); // Importing function to post messages to a queue
const { reportError } = require('../../utilities/sentry'); // Importing function to report errors
const logger = require('../../utilities/logger'); // Importing logger utility

const CampaignService = require('../../services/CampaignService');
const CampaignHistoryService = require('../../services/CampaignHistoryService');

/**
 * @constant
 * @description Schedule for the storage cleanup task
 * @type {Object}
 * @property {string} minute - Specifies that the task should run every minute
 */
const SCHEDULE = {
    minute: '*',
};

/**
 * @function task
 * @description Performs the storage cleanup task
 * @returns {Promise<string>} - A promise resolving to 'done' upon successful completion of the task
 */
const task = async () => {
    logger.info('Queue: Daily Parsing Start'); // Logging an informational message

    const campaignService = new CampaignService();

    const history = new CampaignHistoryService();

    const todayHistory = await history.getTodayHistory();

    let campaignHistory = [];

    todayHistory.data.forEach((eachDay) => {
        if (typeof campaignHistory[eachDay.campaign_id] == 'undefined') {
            campaignHistory[eachDay.campaign_id] = [eachDay];
        } else {
            campaignHistory[eachDay.campaign_id].push(eachDay);
        }
    });

    const { status, data } = await campaignService.getAllActiveCampaigns();

    if (data.length == 0) {
        logger.info('Queue: No active campaign found for running.'); // Logging an informational message
    }

    data.forEach(async (campaign) => {
        if (
            typeof campaignHistory[campaign._id] !== 'undefined' &&
            campaignHistory[campaign._id].length > campaign.run_frequency
        ) {
            logger.info(`Campaign ${campaign.name} running frequency exceed :  `);
            logger.info(
                `Campaign ${campaign.name} running frequency ${
                    campaignHistory[campaign._id].length
                } times : limit ${campaign.run_frequency} `
            );
        } else {
            await postMessageToQueue('feed_parser', 'init', campaign); // Posting a message to the 'storage_cleanup' queue to initiate cleanup
        }
    });
    return 'done'; // Returning 'done' to indicate successful completion of the task
};

/**
 * @function onError
 * @description Handles errors that occur during the task execution
 * @param {Error} err - The error that occurred
 */
const onError = (err) => {
    reportError(err).catch((err) => console.error(err)); // Reporting the error using Sentry utility and logging to console if reporting fails
};

module.exports = {
    schedule: SCHEDULE, // Exporting the schedule for the task
    task, // Exporting the task function
    onError, // Exporting the error handling function
};
