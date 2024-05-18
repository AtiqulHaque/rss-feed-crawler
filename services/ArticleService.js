const ArticleRepository = require('./../database/repositories/ArticleRepository');
const CacheHandler = require('./../utilities/CacheHandler');

/**
 * @description Service for feed parseer
 * @class FeedParserService
 * @date 16/05/2024
 */
class ArticleService {
    constructor() {
        this.repository = new ArticleRepository();
    }

    /**
     * @description Action for parse feed file
     * @returns {object} - Status and data of the deletion operation
     */
    async addArticles(articles) {
        const { status, data } = await this.repository.addArticles(articles);

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
    async removeArticles(campaign_id) {
        const { status, data } = await this.repository.removeByCampaignId(campaign_id);

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

module.exports = ArticleService;
