import { MongoClient } from 'mongodb';
import url from 'url';
let cachedDb = null;

export default async function connectToDatabase(uri: string) {
    if (cachedDb) {
        return cachedDb;
    }

    const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    const db = client.db(url.parse(uri).pathname.substr(1));

    cachedDb = db;
    return db;
}