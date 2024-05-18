const CampaignRepository = require('./../database/repositories/CampaignRepository');
const CacheHandler = require('./../utilities/CacheHandler');

/**
 * @description Service for feed parseer
 * @class CampaignService
 * @date 16/05/2024
 */
class CampaignService {
    constructor() {
        this.repository = new CampaignRepository();
    }

    /**
     * @description Action for parse feed file
     * @returns {object} - Status and data of the deletion operation
     */
    async getAllActiveCampaigns() {
        const { status, data } = await this.repository.getAllActiveCampaign();

        // If file not found, return error
        if (status !== 'success') {
            return {
                status: 'error',
                data: 'No Campaigs not found',
            };
        }

        return {
            status,
            data,
        };
    }

    /**
     * @description Action for parse feed file
     * @returns {object} - Status and data of the deletion operation
     */
    async campaignStatusUpdate(campaign_id, status) {
        const response = await this.repository.updateCampiagnStatus(campaign_id, status);

        // If file not found, return error
        if (response.status !== 'success') {
            return {
                status: 'error',
                data: 'Campaign status failed',
            };
        }

        return {
            status: response.status,
            data: response.data,
        };
    }
}

module.exports = CampaignService;
