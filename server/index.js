import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import { addNewEntry, deleteEntry, searchIt } from '../database/index';
import addExperience from './showExperience';

config();
const app = express();
const port = process.env.PORT;

app.listen(port, () => console.log(`listening on port ${port}`));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/rentals?:location', (req, res) => {
  // TODO: remove res.send result/err after testing is done
  let { location, showExperience } = req.query;
  showExperience = showExperience || Math.random() > 0.5;
  location = location.replace(', ', '_');
  searchIt('rental', location)
    .tap(query => addExperience(query, true, location))
    .then(query => res.send(query))
    .catch(err => res.send(err));
});

app.post('/rentals', (req, res) => {
  // TODO: remove res.send result/err after testing is done
  const { location, index, body } = req.body;
  const qLocation = location.replace(', ', '_');
  addNewEntry(qLocation, index, body)
    .then(result => res.send(result))
    .catch(err => res.send(err));
});
