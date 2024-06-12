const { publishMessage } = require('../mqtt/mqttHandler.js');

function startProducer(topic) {
    setInterval(() => {
        const message = {
            id: generateUniqueId(),
            content: `Message content for ${topic}`,
            date: new Date().toISOString()
        };
        publishMessage(topic, message);
        console.log(`Published message to ${topic}:`, message);
    }, 5000);
}

function generateUniqueId() {
    return Math.random().toString(36).substr(2, 9);
}

module.exports = { startProducer };
