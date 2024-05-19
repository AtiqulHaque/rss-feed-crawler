const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    perday_campaign_add_limit: process.env.PER_DAY_ADD_CAMPAIGN_LIMIT,
    title: 'title',
    content: 'content',
    topic: 'content',
    pub_Date: 'pubDate',
};
