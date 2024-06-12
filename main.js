const { startProducer } = require('./src/producer/producer.js');
const { startConsumer } = require('./src/consumer/consumer.js');
const { initMongo } = require('./src/db/mongoHandler.js');
const { loadPendingMessagesQueue } = require('./src/queue/messageQueue.js');

// Initialisation de la base de données
initMongo().then(async () => {
    console.log('MongoDB initialized.');

    // Charger les messages non validés
    await loadPendingMessagesQueue('topic1');
    await loadPendingMessagesQueue('topic2');

    // Lancer les producteurs
    startProducer('topic1');
    startProducer('topic2');
    
    // Lancer les consommateurs
    startConsumer('consumer1', 'topic1');
    startConsumer('consumer2', 'topic2');
    startConsumer('consumer3', 'topic2');
}).catch(err => {
    console.error('Failed to initialize MongoDB:', err);
});
