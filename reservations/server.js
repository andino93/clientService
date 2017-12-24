import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import uuid from 'uuid/v4';

config();
const reservations = express();
const port = process.env.PORT3;

reservations.listen(port, () => console.log(`reservations server up on ${port}`)); // eslint-disable-line

reservations.use(cors());
reservations.use(bodyParser.json());
reservations.use(bodyParser.urlencoded({ extended: true }));

reservations.post('/bookies', (req, res) => {
  const available = Math.random() > 0.5;
  const reservationId = uuid();
  res.json({ available, reservationId });
});
