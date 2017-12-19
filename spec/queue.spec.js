import { expect, assert } from 'chai';
import { config } from 'dotenv';
import Promise from 'bluebird';
import { getMessages, postMessage, deleteMessages } from '../queue/queue';

config();
describe('AWS Queue', () => {
  let messages;
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

  describe('retrieve and delete messages from queue', () => {
    const messages = [JSON.stringify({hello: 'test', one: 'yes'}), 'this', 'is', 'a', 'test', 'batch']

    it('expect getMessages to exist', () => {
      expect(getMessages).to.exist
    });
    it('expect deleteMessages to exist', () => {
      expect(deleteMessages).to.exist
    });
    it('should retrieve and delete from queue', (done) => {
      getMessages(testQueue)
        .tap(resp => console.log(resp))
        .tap(response => expect(response).to.be.an('object'))
        .tap(response => expect(response).to.have.property('Messages'))
        .tap(({ Messages }) => expect(Messages).to.be.an('array'))
        .tap(({ Messages }) => expect(Messages[0]).to.be.an('object'))
        .tap(({ Messages }) => expect(Messages[0]).to.have.property('Body'))
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
    it('should add mutiple messages to queue', (done) => {
      Promise.map(messages, message => postMessage(message, testQueue))
        .then(() => done())
        .catch(err => done(err))
    });
    it('should retrieve a batch of messages and then delete from queue', (done) => {
      getMessages(testQueue)
      .tap(response => expect(response).to.be.an('object'))
      .tap(response => expect(response).to.have.property('Messages'))
      .tap(({ Messages }) => expect(Messages).to.be.an('array'))
      .tap(({ Messages }) => expect(...Messages).to.be.an('object'))
      .tap(({ Messages }) => expect(...Messages).to.have.property('Body'))
      .tap(({ Messages }) => {
        const isMatch = Messages.every(message => messages.includes(message.Body))
        expect(isMatch).to.be.true;
      })
      .then(({ Messages }) => deleteMessages(Messages, testQueue))
      .tap(res => expect(res).to.have.property('Successful'))
      .tap(res => expect(res.Successful).to.be.an('array'))
      .tap(({ Successful }) => expect(...Successful).to.have.property('Id'))
      .then(() => done())
      .catch(err => done(err));
    })
  });
});
