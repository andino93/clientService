// import redis from 'redis';
// import Promise from 'bluebird';
//
// Promise.promisifyAll(redis.RedisClient.prototype);
// Promise.promisifyAll(redis.Multi.prototype);
//
// const cache = redis.createClient();
//
// cache.on('error', err => console.error(err));

import LRU from 'lru-cache';

const options = {
  max: 500000,
  length: (n, key) => n * 2 + key.length, // eslint-disable-line
  dispose: (key, n) => { n.close(); },
  maxAge: 1000 * 60 * 60,
};

const cache = LRU(options);

const checkCache = (req, res, next) => {
  let { location, showExperience } = req.query; // eslint-disable-line
  showExperience = showExperience || Math.random() > 0.5;
  req.query.showExperience = showExperience;
  const check = cache.get(`${location + showExperience}`);
  // console.log(check)
  if (check) {
    res.json(check);
  } else {
    next();
  }
};

const cacheItem = (key, value) => {
  // console.log('hello caching', key, value)
  cache.set(key, value);
};

export { checkCache, cacheItem };
