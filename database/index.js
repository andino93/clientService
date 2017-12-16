import { config } from 'dotenv';
import elasticsearch from 'elasticsearch';
import Promise from 'bluebird';

config();

const client = new elasticsearch.Client({
  hosts: process.env.ELASTIC,
  index: 'rentals',
  defer: () => Promise.defer(),
});

client.ping({ requestTimeout: 30000 })
  .then(res => console.log('elasticity!', res))
  .catch(err => console.error(err));

const addNewEntry = (location, index, body) => (
  client.index({
    index,
    type: location,
    body,
  })
);

const deleteEntry = (index, type, id) => (
  client.delete({ index, type, id })
);

const searchIt = (index, type, key, param) => (
  client.search({
    index,
    type,
    // body: {
    //   query: {
    //     match: {
    //       [key]: param,
    //     },
    //   },
    // },
  })
);

export { addNewEntry, deleteEntry, searchIt };
