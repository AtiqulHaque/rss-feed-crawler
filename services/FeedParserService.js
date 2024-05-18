let Parser = require('rss-parser');
const { postMessageToQueue } = require('./../utilities/bullmq');
const logger = require('../utilities/logger');
const TopicExtractorService = require('./TopicExtractorService');

/**
 * @description Service for feed parseer
 * @class FeedParserService
 * @date 16/05/2024
 */
class FeedParserService {
    constructor(feed_url, campaign_id) {
        this.feed_url = feed_url;
        this.campaign_id = campaign_id;
    }

    /**
     * @description Action for parse feed file
     * @returns {object} - Status and data of the deletion operation
     */
    async parse() {
        try {
            const extractorService = new TopicExtractorService();
            let parser = new Parser();

            let feed = await parser.parseURL(this.feed_url);

            console.log('Total length of feed : ' + feed.items.length);

            let totalItems = [];

            let count = 0;
            feed.items.forEach(async (item) => {
                if (totalItems.length > 10) {
                    await postMessageToQueue('article_parser', 'handleOne', totalItems);
                    logger.info(
                        `Campaign :  ${this.campaign_id}  chunk ${count++} pushed in to Queue`
                    );
                    totalItems = [];
                }

                console.log(item['pubDate']);
                totalItems.push({
                    title: item.title,
                    content: item.content,
                    topic: this.capitalizeFirstLetter(extractorService.extractTopic(item.content)),
                    campaign_id: this.campaign_id,
                    pub_Date: item['pubDate'],
                });
            });

            if (totalItems > 0) {
                await postMessageToQueue('article_parser', 'handleOne', totalItems);
            }
        } catch (e) {
            console.log('Error found : ', e);
        }

        return {
            status: 'success',
            data: 'success',
        };
    }
    capitalizeFirstLetter(str) {
        return str[0].toUpperCase() + str.slice(1);
    }
}

module.exports = FeedParserService;
