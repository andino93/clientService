import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import uuid from 'uuid/v4';

config();
const tester = express();
const port = process.env.PORT3;

tester.listen(port, () => console.log(`test server up on ${port}`)); // eslint-disable-line

tester.use(cors());
tester.use(bodyParser.json());
tester.use(bodyParser.urlencoded({ extended: true }));

tester.post('/bookies', (req, res) => {
  const available = Math.random() > 0.5;
  const reservationId = uuid();
  res.json({ available, reservationId });
});

tester.get('/homes', (req, res) => {
  const { id } = req.query;
  res.json({ id, details: { thing: 'this is a test of details' } });
});

tester.get('/experiences', (req, res) => {
  const { id } = req.query;
  res.json({ id, details: { thing: 'this is a test of details' } });
});
