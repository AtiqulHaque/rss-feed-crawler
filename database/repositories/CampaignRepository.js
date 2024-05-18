const CampaignModel = require('../models/CampaignModel'); // Importing the CampaignModel for database operations
const logger = require('../../utilities/logger'); // Importing the logger utility for error logging
const app_settings = require('../../settings/app'); // Importing app settings

/**
 * @class CampaignRepository
 * @description A class representing a repository for campaign operations
 * @date 16/05/2024
 */
class CampaignRepository {
    /**
     * @constructor
     * @description Creates an instance of CampaignRepository
     * @date 04/05/2024
     */
    constructor() {
        this.Campaign = CampaignModel; // Assigning the CampaignModel to the Campaign property for database operations
    }

    /**
     * @async
     * @function addCampaign
     * @description Adds a campaign to the repository
     * @date 04/05/2024
     * @param {*} param - The campaign data to be added
     * @returns {*} - A status and data object indicating the result of the operation
     */
    async addCampaign(param) {
        try {
            let response = await this.Campaign.create(param); // Creating a new file entry in the database
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
     * @function getByCampaignId
     * @description Retrieves a campaign from the repository by id
     * @date 04/05/2024
     * @param {*} private_key - The private key of the file to retrieve
     * @returns {*} - A status and data object containing the retrieved file or an error message
     */
    async getByCampaignId(campaign_id) {
        try {
            const file = await this.File.find({ id: campaign_id }); // Finding the file by private key

            if (file.length > 0) {
                return {
                    status: 'success',
                    data: file[0],
                };
            }

            return {
                status: 'error',
                data: 'file not found',
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
                data: errorMessages,
            };
        }
    }

    /**
     * @async
     * @function getAllActiveCampaign
     * @description Retrieves a file from the repository by public key
     * @date 04/05/2024
     * @returns {*} - A status and data object containing the retrieved file or an error message
     */
    async getAllActiveCampaign() {
        try {
            const allcampaigns = await this.Campaign.find({
                status: 'active',
            });

            return {
                status: 'success',
                data: allcampaigns,
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
                data: errorMessages,
            };
        }
    }

    /**
     * @async
     * @function updateCampiagnStatus
     * @description Updates the campaign by its status
     * @date 16/05/2024
     * @param {*} campaign_id - The campaign_id of the campaign to update
     * @returns {*} - A status and data object indicating the result of the operation
     */
    async updateCampiagnStatus(campaign_id, status) {
        try {
            let response = await this.Campaign.updateOne({ id: campaign_id }, { status: status }); // Updating the last access time of the campaign by campaign id

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

module.exports = CampaignRepository; // Exporting the FileRepository class for use in other modules
