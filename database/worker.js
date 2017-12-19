// database writing worker
import express from 'express';
import { config } from 'dotenv';
import Consumer from 'sqs-consumer';
import aws from 'aws-sdk';
import Promise from 'bluebird';
import { addNewEntry, deleteEntry, searchIt, bulkInsert } from './index';
// import { getMessages, postMessage, deleteMessages } from '../queue/queue';

config();

const app = express();
const port = process.env.PORT2;
app.listen(port, () => console.log(`db worker be listenin' on ${port}`));

const params = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_DEFAULT_REGION,
};
aws.config.update(params);

const queue = Consumer.create({
  queueUrl: process.env.AWS_CLIENT_URL,
  batchSize: 10,
  visibilityTimeout: 20,
  terminateVisibilityTimeout: true,
  waitTimeSeconds: 20,
  sqs: new aws.SQS(),
  handleMessage: (message, done) => {
    // insert or update entry
    console.log('handle message: ', message);
    done();
  },
});

queue.on('error', err => console.error('queue error: ', err.message));

queue.start();
