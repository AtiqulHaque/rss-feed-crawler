const { createWrapper } = require('../../utilities/newrelic'); // Importing function to create New Relic wrapper
const logger = require('../../utilities/logger'); // Importing logger utility

const ArticleService = require('./../../services/ArticleService');
/**
 * @constant
 * @description Object containing task handlers for different job names
 * @type {Object}
 */
const TASKS = {
    handleOne,
};

/**
 * @function
 * @description Executes the appropriate task handler based on the job name
 * @param {Object} job - The job object containing name and data properties
 * @returns {Promise<any>} - A promise resolving to the result of the task execution
 */
module.exports = async (job) => {
    const { name, data } = job;
    const handler = TASKS[name];
    if (!handler) throw new Error('Invalid job name passed');

    const wrappedHandler = createWrapper('ping', name, handler); // Creating a New Relic wrapper for the handler function
    return await wrappedHandler(data); // Executing the wrapped handler function with the job data
};

/**
 * @async
 * @function handleOne
 * @description Deletes a single file based on its private key
 * @param {Object} file - The file object to be deleted
 */
async function handleOne(article) {
    const articleService = new ArticleService();
    articleService.addArticles(article);
}
