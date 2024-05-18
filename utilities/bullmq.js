const { getRedis } = require('./redis');

const { Worker, Queue } = require('bullmq');

module.exports.postMessageToQueue = async (queueName, jobName, data, options) => {
    const queue = new Queue(queueName, { connection: getRedis() });
    const response = await queue.add(jobName, data, options);
    await queue.close();

    return response;
};

module.exports.getWorker = (queueName, executableUnit, options) => {
    return new Worker(queueName, executableUnit, {
        connection: getRedis(),
        autorun: false,
        ...options,
    });
};

module.exports.postBulkMessageToQueue = async (queueName, jobName, data, options) => {
    const queue = new Queue(queueName, { connection: getRedis() });

    const response = await queue.addBulk([
        { queueName, data: { paint: 'car' } },
        { queueName, data: { paint: 'house' } },
        { queueName, data: { paint: 'boat' } },
    ]);

    //const response = await queue.add(jobName, data, options);
    await queue.close();

    return response;
};
