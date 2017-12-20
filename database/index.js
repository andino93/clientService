import { config } from 'dotenv';
import elasticsearch from 'elasticsearch';
import Promise from 'bluebird';
import uuid from 'uuid/v4';

config();

const client = new elasticsearch.Client({
  hosts: process.env.ELASTIC,
  // index: 'rentals',
  defer: () => Promise.defer(),
});

client.ping({ requestTimeout: 30000 })
  .then(res => console.log('elasticity!', res))
  .catch(err => console.error('elasticity error! ', err));

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

// deleteEntry('homes', 'home', '0c2d479e-ba1a-4118-8a70-ed48028d446d')
// deleteEntry('homes', 'home', 'df202bbc-980b-42c7-86b0-92c846ed2e48')
// deleteEntry('homes', 'home', '14c33305-d274-4b52-a5f9-cce75d7582c3')
// deleteEntry('homes', 'home', 'c4a90094-2c22-439b-9863-ca423423e75b')


export { addNewEntry, deleteEntry, searchIt, bulkInsert };
