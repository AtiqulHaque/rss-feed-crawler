const { createWrapper } = require('../../utilities/newrelic');
const logger = require('../../utilities/logger');
const CampaignService = require('./../../services/CampaignService');
const FeedParserService = require('./../../services/FeedParserService');
const ArticleService = require('./../../services/ArticleService');
const CampaignHistoryService = require('./../../services/CampaignHistoryService');

const TASKS = {
    init,
};

module.exports = async (job) => {
    const { name, data } = job;
    const handler = TASKS[name];
    if (!handler) throw new Error('Invalid job name passed');

    const wrappedHandler = createWrapper('ping', name, handler);
    return await wrappedHandler(data);
};

async function init(campaign) {
    logger.info(`Campaign processing start :  ${campaign.name}`);

    const Campaign = new CampaignService();

    const History = new CampaignHistoryService();

    try {
        Campaign.campaignStatusUpdate(campaign._id, 'running');

        const articleService = new ArticleService();

        articleService.removeArticles(campaign._id);

        const feedParserService = new FeedParserService(campaign.feed_url, campaign._id);

        feedParserService.parse();

        Campaign.campaignStatusUpdate(campaign._id, 'active');

        History.addHistory({
            campaign_id: campaign._id,
            last_status: 'success',
        });

        logger.info(`Campaign processing end :  ${campaign.name}`);
    } catch (e) {
        console.log(e);
        Campaign.campaignStatusUpdate(campaign._id, 'active');
        History.addHistory({
            campaign_id: campaign._id,
            last_status: 'error',
        });
    }
}
