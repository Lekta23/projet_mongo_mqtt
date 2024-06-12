const { getQueue, ackMessage, addMessage } = require('../queue/messageQueue.js');
const { subscribeToTopic } = require('../mqtt/mqttHandler.js');
const { saveMessage } = require('../db/mongoHandler.js');

function startConsumer(consumerId, topic) {
    subscribeToTopic(topic, async (message) => {
        console.log(`Consumer ${consumerId} received message:`, message);

        try {
            // Traitement du message
            await processMessage(message);
            
            // Accusé de réception du message
            ackMessage(topic, message.id);
            await saveMessage(topic, { ...message, acknowledged: true });
            console.log(`Message ${message.id} acknowledged by consumer ${consumerId}`);
        } catch (error) {
            console.error(`Error processing message ${message.id} by consumer ${consumerId}:`, error);
            // Ré-enqueue du message après un certain temps
            setTimeout(() => {
                addMessage(topic, message);
                console.log(`Message ${message.id} re-enqueued by consumer ${consumerId}`);
            }, 5000); // Ré-enqueue après 5 secondes (ajustez le délai si nécessaire)
        }
    });
}

async function processMessage(message) {
    console.log('Processing message:', message);
    // Simule un traitement avec un délai
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Ajoutez ici la logique de traitement réel
}

module.exports = { startConsumer };
