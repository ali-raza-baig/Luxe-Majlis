import mongoose from 'mongoose'
import dotenv from 'dotenv'
import redis from 'redis'
dotenv.config()

const MongoDb_URI = process.env.MONGODB_URI;
const mongooseConnection = async () => {
    try {
        await mongoose.connect(MongoDb_URI)
        console.log(`MongoDb Connected.`)
    } catch (error) {
        console.log(`MongoDb not connected`)
        console.error(`Error : ${error}`)
    }
};


const redisConnection = async () => {
    const REDIS_URI = process.env.REDIS_URI
    try {
        const client = await redis.createClient({
            url: REDIS_URI
        });

        client.on('error', (err) => console.log(`Error in Redis : ${err}`));
        await client.connect()
        console.log('Redis Connected.');
        return client;
    } catch (error) {
        console.log(`Redis connection failed : ${error}`)
    }
};

export { mongooseConnection, redisConnection };