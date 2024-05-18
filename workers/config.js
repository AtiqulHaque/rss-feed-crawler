module.exports.QUEUE_CONFIGURATIONS = {
    ping: {
        concurrency: 1,
    },

    feed_parser: {
        concurrency: 1,
    },
    article_parser: {
        concurrency: 5,
    },
};
