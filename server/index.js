import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import axios from 'axios';
import { searchIt } from '../database/index';
import addExperience from '../helpers/addExperience';
import getUrl from '../helpers/details';
import { checkCache, cacheItem } from '../cache/redis';

config();
const app = express();
const port = process.env.PORT;

app.listen(port, () => console.log(`listening on port ${port}`)); // eslint-disable-line
<<<<<<< HEAD

=======
>>>>>>> add reservation id

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(checkCache);

app.get('/rentals?:location', (req, res) => {
  // TODO: remove res.send result/err after testing is done
  let { location, showExperience } = req.query; // eslint-disable-line
  // showExperience = showExperience || Math.random() > 0.5;
  searchIt('homes', 'home', location)
    .then(query => addExperience(query, showExperience, location))
    .tap(result => cacheItem(`${location + showExperience}`, result))
    .then(result => res.send(result))
    .catch(err => res.send(err));
});

app.get('/details?:id', (req, res) => {
<<<<<<< HEAD
  // TODO: find endpoint for inv services
  const { type, id } = req.query;
  const url = getUrl(type);
  axios.get(url, { params: { id } })
    .then(({ data }) => res.json(data))
    .catch(err => console.error(err)); // eslint-disable-line
=======
  // TODO: find endpoint for inventory services
  // if experience ? ping experince services
  // if home ? ping home service
>>>>>>> add route and tests for detailed info request
});

app.post('/reservations', (req, res) => {
  // TODO: should package up booking info and send to reservation service
  axios.post(`${process.env.RESERVATIONS_SERVICE}/bookies`, req.body)
    .then(response => res.json(response.data))
    .catch(err => console.error('err', err)); // eslint-disable-line
});
