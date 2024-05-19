let Parser = require('rss-parser');
const { postMessageToQueue } = require('./../utilities/bullmq');
const logger = require('../utilities/logger');
const TopicExtractorService = require('./TopicExtractorService');
const app_settings = require('./../settings/app');

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
            const extractorService = new TopicExtractorService({
                language: 'english',
                remove_digits: true,
                return_changed_case: true,
                remove_duplicates: false,
            });

            let parser = new Parser();
            let feed = await parser.parseURL(this.feed_url);
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

                const isTitle = typeof item[app_settings.title] === 'undefined';
                const isContent = typeof item[app_settings.content] === 'undefined';
                const isPubDate = typeof item[app_settings.pub_Date] === 'undefined';

                if (isTitle || isContent || isPubDate) {
                    logger.info(
                        `Campaign :  ${this.campaign_id}  found article which is not valid`
                    );
                    return;
                }

                totalItems.push({
                    title: item[app_settings.title],
                    content: item[app_settings.content],
                    topic: this.capitalizeFirstLetter(
                        extractorService.extractTopic(item[app_settings.content])
                    ),
                    campaign_id: this.campaign_id,
                    pub_Date: item[app_settings.pub_Date],
                    source_url: this.feed_url,
                });
            });

            if (totalItems > 0) {
                await postMessageToQueue('article_parser', 'handleOne', totalItems);
            }
        } catch (e) {
            console.error('Error found : ', e);
            throw new Error(`Found error while parsing Campaign : ${this.campaign_id}`);
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
