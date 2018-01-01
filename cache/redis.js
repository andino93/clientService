import redis from 'redis';
import Promise from 'bluebird';

Promise.promisifyAll(redis.RedisClient.prototype);
Promise.promisifyAll(redis.Multi.prototype);

const cache = redis.createClient();

cache.on('error', err => console.error(err));
