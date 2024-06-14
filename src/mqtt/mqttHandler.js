const mqtt = require('mqtt');
const { addMessage } = require('../queue/messageQueue.js');
const { saveMessage } = require('../db/mongoHandler.js');

const client = mqtt.connect('mqtt://test.mosquitto.org');

client.on('connect', () => {
    console.log('Connected to MQTT broker at test.mosquitto.org');
});

function publishMessage(topic, message) {
    client.publish(topic, JSON.stringify(message), async () => {
        await saveMessage(topic, { ...message, acknowledged: false });
        addMessage(topic, message);
    });
}

function subscribeToTopic(topic, messageHandler) {
    client.subscribe(topic, (err) => {
        if (!err) {
            console.log(`Subscribed to ${topic}`);
        } else {
            console.error(`Failed to subscribe to ${topic}:`, err);
        }
    });

    client.on('message', (receivedTopic, message) => {
        if (receivedTopic === topic) {
            let parsedMessage;
            try {
                parsedMessage = JSON.parse(message.toString());
            } catch (e) {
                console.error('Failed to parse message:', message.toString(), e);
                return;
            }
            messageHandler(parsedMessage);
        }
    });
}

module.exports = { publishMessage, subscribeToTopic };
