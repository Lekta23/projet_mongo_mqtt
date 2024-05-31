const { getQueue, ackMessage } = require('../queue/messageQueue.js');
const { subscribeToTopic } = require('../mqtt/mqttHandler.js');

function startConsumer(consumerId, topic) {
    subscribeToTopic(topic, async (message) => {
        console.log(`Consumer ${consumerId} received message:`, message);

        // Traitement du message
        await processMessage(message);

        // Accusé de réception du message
        ackMessage(topic, message.id);
    });
}

async function processMessage(message) {
    // Logique de traitement du message
    console.log('Processing message:', message);
    // Simule un traitement
    await new Promise(resolve => setTimeout(resolve, 1000));
}

module.exports = { startConsumer };
