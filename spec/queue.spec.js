import { expect, assert } from 'chai';
import { config } from 'dotenv';
import { getMessages, postMessage, deleteMessages } from '../server/queue';

config();
describe('AWS Queue', () => {
  const testQueue = process.env.AWS_TESTQ_URL

  describe('post messages to queue', () => {
    it('expect postMessage to exist', () => {
      expect(postMessage).to.exist;
    });
    it('should receive valid response when posting to queue', (done) => {
      postMessage('this is a mocha test', testQueue)
        .tap(response => expect(response).to.have.property('MessageId'))
        .tap(response => expect(response.ResponseMetadata).to.be.an('object'))
        .tap(response => expect(response.ResponseMetadata).to.have.property('RequestId'))
        .tap(response => expect(response.ResponseMetadata.RequestId).to.be.a('string'))
        .then(() => done())
        .catch(err => done(err));
    });
  });

  describe('retrieve message from queue', () => {
    it('expect getMessages to exist', () => {
      expect(getMessages).to.exist
    });
    it('should retrieve from queue', (done) => {
      getMessages(testQueue)
        .tap(response => expect(response).to.be.an('object'))
        .tap(response => expect(response).to.have.property('Messages'))
        .tap(({ Messages }) => expect(Messages).to.be.an('array'))
        .tap(({ Messages }) => expect(Messages[0]).to.be.an('object'))
        .tap(({ Messages }) => expect(Messages[0]).to.have.property('Body'))
        .then(() => done())
        .catch(err => done(err));
    });
  });

  describe('should delete messages from queue', () => {
    let messages;
    before(done => {
      getMessages(testQueue)
        .tap(({ Messages }) => messages = Messages)
        .then(() => done())
        .catch(err => done(err));
    });
    it('expect deleteMessages to exist', () => {
      expect(deleteMessages).to.exist
    });
    it('should delete messages from queue', (done) => {
      deleteMessages(messages, testQueue)
        .tap(res => expect(res).to.have.property('Successful'))
        .tap(res => expect(res.Successful).to.be.an('array'))
        .tap(res => expect(res.Successful[0]).to.have.property('Id'))
        .then(() => done());
    })
  });
});
