const queues = {};

function getQueue(topic) {
    if (!queues[topic]) {
        queues[topic] = [];
    }
    return queues[topic];
}

function addMessage(topic, message) {
    const queue = getQueue(topic);
    queue.push(message);
}

function ackMessage(topic, messageId) {
    const queue = getQueue(topic);
    const index = queue.findIndex(msg => msg.id === messageId);
    if (index > -1) {
        queue.splice(index, 1);
    }
}

module.exports = { getQueue, addMessage, ackMessage };
