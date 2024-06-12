const { loadPendingMessages } = require('../db/mongoHandler.js')

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

async function loadPendingMessagesQueue(topic) {
    const messages = await loadPendingMessages(topic);
    messages.forEach(message => addMessage(topic, message));
    console.log(`Loaded ${messages.length} pending messages for ${topic}`);
}


module.exports = { getQueue, addMessage, ackMessage, loadPendingMessagesQueue };
