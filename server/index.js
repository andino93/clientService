import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import axios from 'axios';
import { searchIt } from '../database/index';
import addExperience from '../helpers/addExperience';
import getUrl from '../helpers/details';

config();
const app = express();
const port = process.env.PORT;

app.listen(port, () => console.log(`listening on port ${port}`)); // eslint-disable-line

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

app.get('/details?:id', (req, res) => {
  // TODO: find endpoint for inv services
  const { type, id } = req.query;
  const url = getUrl(type);
  console.log(url)
  // if experience ? ping experience service
  // if home ? ping home service
  axios.get(url, { params: { id } })
    .then(({ data }) => res.json(data))
    // .tapCatch(err => console.error(err)) // eslint-disable-line
    .catch(err => console.error(err));
});

app.post('/reservations', (req, res) => {
  // TODO: should package up booking info and send to reservation service
  axios.post(`${process.env.RESERVATIONS_SERVICE}/bookies`, req.body)
    .then(response => res.json(response.data))
    .catch(err => console.error('err', err)); // eslint-disable-line
});
