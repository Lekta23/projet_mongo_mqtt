const { MongoClient } = require('mongodb');

let db;

async function initMongo() {
    try {
        const client = new MongoClient('mongodb+srv://user:Lekta@cluster0.eatz59u.mongodb.net/', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        await client.connect();
        db = client.db('messageQueueDB');
        console.log('Connected to MongoDB');
        
        // Handle process termination to close MongoDB connection
        process.on('SIGINT', () => {
            client.close().then(() => {
                console.log('MongoDB connection closed');
                process.exit(0);
            });
        });
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        throw error;
    }
}

async function saveMessage(topic, message) {
    try {
        const collection = db.collection(topic);
        await collection.updateOne(
            { id: message.id },
            { $set: message },
            { upsert: true }
        );
        console.log(`Message saved to ${topic}:`, message);
    } catch (error) {
        console.error(`Failed to save message to ${topic}:`, error);
        throw error;
    }
}




async function loadPendingMessages(topic) {
    try {
        const collection = db.collection(topic);
        return await collection.find({ acknowledged: false }).toArray();
    } catch (error) {
        console.error(`Failed to load pending messages from ${topic}:`, error);
        throw error;
    }
}

module.exports = { initMongo, saveMessage, loadPendingMessages  };
