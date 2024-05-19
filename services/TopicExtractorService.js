const keyword_extractor = require('keyword-extractor');
const { forEach } = require('../utilities/logger');

class TopicExtractorService {
    constructor(settings) {
        this.settings = settings;
    }

    extractTopic(document) {
        const allkeywords = keyword_extractor.extract(document, this.settings);
        let topicsObj = {};

        allkeywords.forEach((eachTopic) => {
            if (typeof topicsObj[eachTopic] === 'undefined') {
                topicsObj[eachTopic] = 1;
            } else {
                topicsObj[eachTopic] += 1;
            }
        });

        let maxCount = 0;
        let topic = 'Default Random Topic';

        for (const key in topicsObj) {
            if (Object.hasOwnProperty.call(topicsObj, key)) {
                const count = topicsObj[key];
                if (count >= maxCount) {
                    topic = key;
                    maxCount = count;
                }
            }
        }

        return topic;
    }
}

module.exports = TopicExtractorService;
