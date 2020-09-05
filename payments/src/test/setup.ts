import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

declare global {
    namespace NodeJS {
        interface Global {
            signin(id?: string): string[];
        }
    }
}

jest.mock('../nats-wrapper');

process.env.STRIPE_KEY = 'sk_test_51HNtoXKIvQ4bHVvuHeRoAGXVkBQb5GIHsmuklf9kWuwlS7ktjD49Tfs8UvJlVFt357GHRYY8S2RXAYHmJMf0V0ma00SX5S4jGW';

let mongo: any;

beforeAll(async () => {
    process.env.JWT_KEY = 'asdfasdf';
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

    mongo = new MongoMemoryServer();
    const mongoUri = await mongo.getUri();

    await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
});

beforeEach(async () => {
    jest.clearAllMocks();
    const collections = await mongoose.connection.db.collections();

    for (let collection of collections) {
        await collection.deleteMany({});
    }
});

afterAll(async () => {
    await mongo.stop();
    await mongoose.connection.close();
});

global.signin = (id?: string) => {
    // build a jwt payload {id, email}
    const payload = {
        id: id || new mongoose.Types.ObjectId().toHexString(),
        email: 'test@test.com',
    };

    // create the jwt
    const token = jwt.sign(payload, process.env.JWT_KEY!);

    // build the session object {jwt: MY_JWT}
    const session = { jwt: token };

    // turn that session into JSON
    const sessionJSON = JSON.stringify(session);

    // take JSON and encode it as base64
    const base64 = Buffer.from(sessionJSON).toString('base64');

    // return a string that is the cookie with the encoded data
    return [`express:sess=${base64}`];
}