const { startProducer } = require('./src/producer/producer.js');
const { startConsumer } = require('./src/consumer/consumer.js');
const { initMongo } = require('./src/db/mongoHandler.js');

// Initialisation de la base de données
initMongo().then(() => {
    console.log('MongoDB initialized.');

    // Lancer les producteurs et les consommateurs
    startProducer('topic1');
    startProducer('topic2');
    
    startConsumer('consumer1', 'topic1');
    startConsumer('consumer2', 'topic2');
    startConsumer('consumer3', 'topic2');
}).catch(err => {
    console.error('Failed to initialize MongoDB:', err);
});
