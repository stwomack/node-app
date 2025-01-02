const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

const uri = `mongodb+srv://${username}:${password}@mdb-kpack.aotr6.mongodb.net/customOrder?retryWrites=true&w=majority&appName=orders-service-cluster`;

async function getLatestDocuments() {
  const client = new MongoClient(uri);

  try {
    console.log("username: ", username);
    console.log("URI: ", uri);
    await client.connect();
    console.log("Connected to MongoDB");

    const database = client.db("customOrder"); 
    const collection = database.collection("customOrder");

    const documents = await collection.find().sort({ _id: -1 }).limit(10).toArray(); 

    return documents;

  } finally {
    await client.close();
  }
}

module.exports = { getLatestDocuments }; 