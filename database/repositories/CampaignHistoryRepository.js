const CampaignRunningHistoryModel = require('../models/CampaignRunningHistoryModel'); // Importing the FileModel for database operations
const logger = require('../../utilities/logger'); // Importing the logger utility for error logging
const app_settings = require('../../settings/app'); // Importing app settings
const moment = require('moment');

/**
 * @class ArticleRepository
 * @description A class representing a repository for article operations
 * @date 16/05/2024
 */
class CampaignHistoryRepository {
    /**
     * @constructor
     * @description Creates an instance of ArticleRepository
     * @date 04/05/2024
     */
    constructor() {
        this.CampaignRunningHistory = CampaignRunningHistoryModel; // Assigning the CampaignModel to the Campaign property for database operations
    }

    /**
     * @async
     * @function addArticles
     * @description Adds a article to the repository
     * @date 04/05/2024
     * @param {*} param - The article data to be added
     * @returns {*} - A status and data object indicating the result of the operation
     */
    async addHistory(history) {
        try {
            let response = await this.CampaignRunningHistory.create(history); // Creating a new file entry in the database
            return {
                status: 'success',
                data: response,
            };
        } catch (e) {
            console.log(e); // Logging the error to the console
            logger.log('error', e); // Logging the error using the logger utility

            let errorMessages = e;

            if (typeof e.errors !== 'undefined') {
                errorMessages = e.errors;
            }

            return {
                status: 'error',
                data: errorMessages,
            };
        }
    }

    /**
     * @async
     * @function getAllTodayHistory
     * @description Retrieves a file from the repository by public key
     * @date 04/05/2024
     * @returns {*} - A status and data object containing the retrieved file or an error message
     */
    async getAllTodayHistory() {
        try {
            const today = moment().startOf('day');
            const allHistories = await this.CampaignRunningHistory.find({
                created_at: {
                    $gte: today.toDate(),
                    $lte: moment(today).endOf('day').toDate(),
                },
            });

            return {
                status: 'success',
                data: allHistories,
            };
        } catch (e) {
            console.log(e);
            logger.log('error', e);

            let errorMessages = e;

            if (typeof e.errors !== 'undefined') {
                errorMessages = e.errors;
            }

            return {
                status: 'error',
                data: [],
            };
        }
    }
}

module.exports = CampaignHistoryRepository; // Exporting the FileRepository class for use in other modules
