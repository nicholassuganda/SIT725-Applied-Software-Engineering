const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGODB_URI || "mongodb+srv://sugandanicholas:IgcSizEJ2BDjx0W7@cluster0.46e1abc.mongodb.net/";

let collection;
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function connectDB() {
    try {
        await client.connect();
        collection = client.db().collection('Comment');
        console.log("Database connected successfully.");
    } catch (error) {
        console.error("Database connection failed:", error);
    }
}

function postComment(comment, callback) {
    collection.insertOne(comment, callback);
}

function getAllComments(callback) {
    collection.find({}).toArray(callback);
}

module.exports = { connectDB, postComment, getAllComments };
