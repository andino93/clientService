import { expect, assert } from 'chai';
import { config } from 'dotenv';
import Promise from 'bluebird';
import { getMessages, postMessage, deleteMessages } from '../server/queue';

config();
describe('AWS Queue', () => {
  const testQueue = process.env.AWS_TESTQ_URL
  let messages;

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

  describe('retrieve and delete messages from queue', () => {
    // TODO: write test for multiple inserts and deletes 
    // before((done) => {
    //   const messages = ['hello', 'this', 'is', 'a', 'test', 'batch']
    //   Promise.map(messages, message => postMessage(message, testQueue))
    //     .then(() => done());
    // })

    it('expect getMessages to exist', () => {
      expect(getMessages).to.exist
    });
    it('expect deleteMessages to exist', () => {
      expect(deleteMessages).to.exist
    });
    it('should retrieve and delete from queue', (done) => {
      getMessages(testQueue)
        .tap(response => expect(response).to.be.an('object'))
        .tap(response => expect(response).to.have.property('Messages'))
        .tap(({ Messages }) => expect(Messages).to.be.an('array'))
        .tap(({ Messages }) => expect(Messages[0]).to.be.an('object'))
        .tap(({ Messages }) => expect(Messages[0]).to.have.property('Body'))
        .tap(({ Messages }) => messages = Messages)
        .then(({ Messages }) => deleteMessages(Messages, testQueue))
        .tap(res => expect(res).to.have.property('Successful'))
        .tap(res => expect(res.Successful).to.be.an('array'))
        .tap(({ Successful }) => expect(...Successful).to.have.property('Id'))
        .then(() => done())
        .catch(err => done(err));
    });
    it('should not retrieve messages from queue after delete', (done) => {
      getMessages(testQueue)
        .then(response => expect(response.Messages).to.be.undefined)
        .then(() => done())
    });
  });
});
