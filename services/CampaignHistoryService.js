const CampaignHistoryRepository = require('./../database/repositories/CampaignHistoryRepository');
const CacheHandler = require('./../utilities/CacheHandler');

/**
 * @description Service for feed parseer
 * @class FeedParserService
 * @date 16/05/2024
 */
class CampaignHistoryService {
    constructor() {
        this.repository = new CampaignHistoryRepository();
    }

    /**
     * @description Action for parse feed file
     * @returns {object} - Status and data of the deletion operation
     */
    async addHistory(articles) {
        const { status, data } = await this.repository.addHistory(articles);

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
    async getTodayHistory() {
        const { status, data } = await this.repository.getAllTodayHistory();

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
}

module.exports = CampaignHistoryService;
