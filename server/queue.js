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

const postMessage = (MessageBody, QueueUrl) => (
  sqs.sendMessage({ MessageBody, QueueUrl })
);

const getMessages = () => (
  sqs.receiveMessage({ MaxNumberOfMessages: 10, QueueUrl: process.env.AWS_THESIS_URL })
);

export { getMessages, postMessage };
