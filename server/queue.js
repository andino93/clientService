import AWS from 'aws-sdk';
import Promise from 'bluebird';
import { config } from 'dotenv';

config();
AWS.config.setPromisesDependency(require('bluebird'));

const params = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_DEFAULT_REGION,
};

AWS.config.update(params);

const sqs = new AWS.SQS();

const postMessage = (MessageBody, QueueUrl) => {
  return new Promise((resolve, reject) => {
    sqs.sendMessage({ MessageBody, QueueUrl }, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
};

const getMessages = () => {
  return new Promise((resolve, reject) => {
    sqs.receiveMessage(
      {
        MaxNumberOfMessages: 10,
        QueueUrl: process.env.AWS_THESIS_URL,
      },
      (err, data) => {
        if (err) reject(err);
        else resolve(data);
      },
    );
  });
};

export { getMessages, postMessage };
