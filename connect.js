
const { MongoClient } = require('mongodb');

// Connection URI
const uri = "mongodb+srv://<rhythmpg05>:<FnvVFLgpcjCdmAF>@cluster1.sozzyau.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1"; // Replace with your MongoDB URI

// Database Name
const dbName = "yourDatabaseName";

async function connectToMongoDB() {
    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB server
        await client.connect();
        console.log("Connected successfully to MongoDB");

        // Access the database
        const db = client.db(dbName);

        // Perform operations (example: list collections)
        const collections = await db.listCollections().toArray();
        console.log("Collections:", collections);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    } finally {
        // Close the connection
        await client.close();
    }
}

connectToMongoDB();