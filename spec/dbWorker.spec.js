import { expect, assert } from 'chai';
import { config } from 'dotenv';
import { postMessage, getMessages } from '../queue/queue';
import { searchIt, deleteEntry } from '../database/index';
import worker from '../database/worker';

config();
const queueUrl = process.env.AWS_TESTQ_URL;

describe('Database Worker:', () => {
  before((done) => {
    const test = {
      type: 'homes',
      title: 'Testing',
      description: 'this is a test description',
      datesAvailable: { 1: [1, 2, 3] },
      city: 'Testing',
      suburb: 'TestSub',
      price: 0,
      homeId: '12345test',
      guestCount: 6,
    };
    postMessage(test, queueUrl)
      .then(() => done())
      .catch(err => done(err));
  });

  it('should not find message in queue', (done) => {
    getMessages(queueUrl)
      .tap(response => expect(response).to.not.have.property('Messages'))
      .then(() => setTimeout(done, 1500))// to give DB time to write after queue fetch
      .catch(err => done(err));
  });

  it('should find test entry in database', (done) => {
    searchIt('homes', 'home', 'testing')
      .tap(query => expect(query.hits.hits[0]._source).to.be.an('object'))
      .tap(query => expect(query.hits.hits[0]._source).to.have.property('city'))
      .tap(query => expect(query.hits.hits[0]._source.city).to.equal('Testing'))
      .then(query => deleteEntry('homes', 'home', query.hits.hits[0]._id))
      .then(() => done())
      .catch(err => done(err))
  });
});
