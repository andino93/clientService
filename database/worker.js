// database writing worker
import express from 'express';
import { config } from 'dotenv';
import Consumer from 'sqs-consumer';
import aws from 'aws-sdk';
import { addNewEntry, deleteEntry, searchIt, bulkInsert } from './index';

config();

const app = express();
const port = process.env.PORT2;
let queueUrl = process.env.AWS_TESTQ_URL;
if (process.env.NODE_ENV !== 'development') queueUrl = process.env.AWS_CLIENT_URL;

app.listen(port, () => console.log(`db worker be listenin' on ${port}`));

const params = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_DEFAULT_REGION,
};

aws.config.update(params);

const queue = Consumer.create({
  queueUrl,
  batchSize: 10,
  visibilityTimeout: 20,
  terminateVisibilityTimeout: true,
  waitTimeSeconds: 20,
  sqs: new aws.SQS(),
  handleMessage: (message, done) => {
    // insert or update entry
    const listing = JSON.parse(message.Body);
    addNewEntry(listing.city, listing.type, listing, listing.type.slice(0, -1))
      .tap(resp => console.log(resp))
      .then(() => done())
      .catch(err => done(err));
  },
});

queue.on('error', err => console.error('queue error: ', err.message));

queue.start();
