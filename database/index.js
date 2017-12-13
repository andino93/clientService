import { config } from 'dotenv';
import elasticsearch from 'elasticsearch';
import Promise from 'bluebird';

config();
const search = new elasticsearch.Client({
  hosts: process.env.ELASTIC,
  defer: () => Promise.defer(),
});

search.ping({ requestTimeout: 30000 })
  .then(() => console.log('elasticity!'))
  .catch(err => console.error(err));

const addNewEntry = (location, type, id, body) => (
  search.index({
    index: location,
    type,
    id,
    body,
  })
);

const deleteEntry = (index, type, id) => (
  search.delete({ index, type, id })
);

const searchIt = (index, type, key, param) => (
  search.search({
    index,
    type,
    body: {
      query: {
        match: {
          [key]: param,
        },
      },
    },
  })
);

export { addNewEntry, deleteEntry, searchIt };
