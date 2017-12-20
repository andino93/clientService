import AWS from 'aws-sdk';
import Promise from 'bluebird';
import { config } from 'dotenv';

config();
const params = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_DEFAULT_REGION,
};

AWS.config.update(params);

const sqs = new AWS.SQS();
sqs.sendMessage = Promise.promisify(sqs.sendMessage);
sqs.receiveMessage = Promise.promisify(sqs.receiveMessage);
sqs.deleteMessageBatch = Promise.promisify(sqs.deleteMessageBatch);
sqs.purgeQueue = Promise.promisify(sqs.purgeQueue);

const postMessage = (message, QueueUrl = process.env.AWS_CLIENT_URL) => {
  const MessageBody = JSON.stringify(message);
  return sqs.sendMessage({ MessageBody, QueueUrl });
};

const getMessages = (QueueUrl = process.env.AWS_CLIENT_URL) => (
  sqs.receiveMessage({ MaxNumberOfMessages: 10, QueueUrl })
);

const formatDelete = array => array.map(({ MessageId, ReceiptHandle }) => (
  { Id: MessageId, ReceiptHandle }
));

const deleteMessages = (Messages, QueueUrl = process.env.AWS_CLIENT_URL) => {
  const Entries = formatDelete(Messages);
  return sqs.deleteMessageBatch({ Entries, QueueUrl });
};


// const messages = [{ hello: 'test', one: 'yes' }, 'this', 'is', 'a', 'test', 'batch'];
// Promise.map(messages, message => postMessage(message, process.env.AWS_TESTQ_URL))
//   .then(mess => console.log('post ', mess))
//   .catch(err => console.error('err in post', err));
export { getMessages, postMessage, deleteMessages };
