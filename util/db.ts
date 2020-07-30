import { MongoClient } from 'mongodb';
import url from 'url';

export default async function connectToDatabase(uri: string) {
    const client = await MongoClient.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    return client;
}
