import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import { addNewEntry, searchIt } from '../database/index';
import addExperience from './addExperience';

config();
const app = express();
const port = process.env.PORT;

app.listen(port, () => console.log(`listening on port ${port}`));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/rentals?:location', (req, res) => {
  // TODO: remove res.send result/err after testing is done
  let { location, showExperience } = req.query; // eslint-disable-line
  showExperience = showExperience || Math.random() > 0.5;
  searchIt('homes', 'home', location)
    .then(query => addExperience(query, showExperience, location))
    .then(result => res.send(result))
    .catch(err => res.send(err));
});

app.post('/rentals', (req, res) => {
  // TODO: remove res.send result/err after testing is done
  const { location, index, body } = req.body;
  addNewEntry(location, index, body)
    .then(result => res.send(result))
    .catch(err => res.send(err));
});
