const { MongoClient } = require('mongodb');

let db;

async function initMongo() {
    const client = new MongoClient('mongodb+srv://user:Lekta@cluster0.eatz59u.mongodb.net/');
    await client.connect();
    db = client.db('messageQueueDB');
    console.log('Connected to MongoDB');
}

async function saveMessage(topic, message) {
    const collection = db.collection(topic);
    await collection.insertOne(message);
}

async function loadUnacknowledgedMessages(topic) {
    const collection = db.collection(topic);
    return await collection.find({ acknowledged: false }).toArray();
}

module.exports = { initMongo, saveMessage, loadUnacknowledgedMessages };
