import { Redis } from "ioredis";

const getRedisURL = () => {
    const REDIS_URL = process.env.REDIS_URL
    if(!REDIS_URL) throw Error("evn variable DB_URI is not provided");
    return REDIS_URL
}

export const redisClient = new Redis(getRedisURL())
