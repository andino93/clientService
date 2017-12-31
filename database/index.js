import { config } from 'dotenv';
import elasticsearch from 'elasticsearch';
import Promise from 'bluebird';
import uuid from 'uuid/v4';
import aws from 'aws-sdk';

config();

const options = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_DEFAULT_REGION,
};

aws.config.update(options);

const client = new elasticsearch.Client({
  hosts: process.env.AWSES,
  connectionClass: require('http-aws-es'), // eslint-disable-line
  defer: () => Promise.defer(),
});

client.ping({ requestTimeout: 30000 })
  .then(res => console.log('elasticity!', res)) // eslint-disable-line
  .catch(err => console.error('elasticity error! ', err)); // eslint-disable-line

const addNewEntry = (location, index, body, type, id = uuid()) => (
  client.index({
    index,
    type,
    id,
    body,
  })
);

const bulkInsert = params => (
  client.bulk(params)
);

const deleteEntry = (index, type, id) => (
  client.delete({ index, type, id })
);

const searchIt = (index, type, query, key = 'city') => (
  client.search({
    index,
    type,
    body: {
      query: {
        match: {
          [key]: query,
        },
      },
    },
  })
);

export { addNewEntry, deleteEntry, searchIt, bulkInsert };
