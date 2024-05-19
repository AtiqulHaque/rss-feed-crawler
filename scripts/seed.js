const mongoose = require('mongoose');
const logger = require('../utilities/logger');

const CampaignModel = require('./../database/models/CampaignModel');
const seedCampaigns = async function (seedData) {
    await mongoose.connect(process.env.MONGO_DSN);
    await CampaignModel.deleteMany();
    await CampaignModel.insertMany(seedData);
    mongoose.connection.close();
    console.log('Database seeding has been completed.....');
    return;
};

seedCampaigns([
    {
        name: 'megaphone',
        feed_url: 'https://feeds.megaphone.fm/newheights',
        run_frequency: 4,
        max_running_time: 30,
        status: 'active',
    },
    {
        name: 'The Daily',
        feed_url: 'https://feeds.simplecast.com/54nAGcIl',
        run_frequency: 4,
        max_running_time: 30,
        status: 'active',
    },
    {
        name: 'Huffington Post',
        feed_url: 'https://www.yahoo.com/news/rss',
        run_frequency: 10,
        max_running_time: 120,
        status: 'active',
    },
]);
