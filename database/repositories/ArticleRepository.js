const ArticleModel = require('../models/ArticleModel'); // Importing the FileModel for database operations
const logger = require('../../utilities/logger'); // Importing the logger utility for error logging
const app_settings = require('../../settings/app'); // Importing app settings

/**
 * @class ArticleRepository
 * @description A class representing a repository for article operations
 * @date 16/05/2024
 */
class ArticleRepository {
    /**
     * @constructor
     * @description Creates an instance of ArticleRepository
     * @date 04/05/2024
     */
    constructor() {
        this.Article = ArticleModel; // Assigning the CampaignModel to the Campaign property for database operations
    }

    /**
     * @async
     * @function addArticles
     * @description Adds a article to the repository
     * @date 04/05/2024
     * @param {*} param - The article data to be added
     * @returns {*} - A status and data object indicating the result of the operation
     */
    async addArticles(articles) {
        try {
            let response = await this.Article.insertMany(articles); // Creating a new file entry in the database
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
     * @function removeByCampaignId
     * @description Removes a article from the repository by campaign_id
     * @date 04/05/2024
     * @param {*} campaign_id - The campaign_id of the file to remove
     * @returns {*} - A status and data object indicating the result of the operation
     */
    async removeByCampaignId(campaign_id) {
        try {
            let response = await this.Article.find({ campaign_id: campaign_id }).remove(); // Removing the file by private key

            return {
                status: 'success',
                data: response,
            };
        } catch (e) {
            console.log(e);
            logger.log('error', e);

            return {
                status: 'error',
                data: e,
            };
        }
    }
}

module.exports = ArticleRepository; // Exporting the FileRepository class for use in other modules
