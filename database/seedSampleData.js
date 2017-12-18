import faker from 'faker';
import _ from 'lodash';
import Promise from 'bluebird';
import uuid from 'uuid/v4';
import { addNewEntry } from './index';
import { cities, neighborhoods } from '../sampleNames';

const getPrice = () => Math.floor(40 + (Math.random() * 150));

const randomNumber = (min, max) => (
  Math.floor(Math.random() * (max - min + 1)) + min // eslint-disable-line
);

const fakeDates = () => {
  const randomMonth = randomNumber(1, 12);
  const isShort = randomMonth === 2 ? 28 : 30;
  const begin = randomNumber(1, isShort);
  const end = randomNumber(begin, isShort);
  const randomDayRange = _.range(begin, end, 1);
  if (begin === end) {
    randomDayRange.push(begin);
  }
  return {
    [randomMonth]: randomDayRange,
  };
};

const parseIt = (city) => {
  city = city.replace(', ', '_'); // eslint-disable-line
  city = city.replace(' ', ''); // eslint-disable-line
  return city;
};

  // TODO: To Reservations needs guest count

const populateHomes = (quantity) => {
  const homes = [];
  for (let i = 1; i <= quantity; i += 1) {
    const home = {
      title: faker.fake('{{random.words}}'),
      description: faker.fake('{{lorem.sentences}}'),
      datesAvailable: fakeDates(),
      city: cities[randomNumber(0, cities.length - 1)],
      suburb: neighborhoods[randomNumber(0, neighborhoods.length - 1)],
      price: getPrice(),
      homeId: uuid(),
      guestCount: randomNumber(1, 6),
    };
    addNewEntry(home.city, 'homes', home)
      .then(response => console.log('success', response)) // eslint-disable-line
      .catch(err => console.error('errr', err)); // eslint-disable-line
  }
};

populateHomes(1000);

const populateExperiences = (quantity) => {
  const experiences = [];
  for (let i = 1; i <= quantity; i += 1) {
    const experience = {
      title: faker.fake('{{random.words}}'),
      description: faker.fake('{{lorem.sentences}}'),
      datesAvailable: fakeDates(),
      city: cities[randomNumber(0, cities.length - 1)],
      suburb: neighborhoods[randomNumber(0, neighborhoods.length - 1)],
      price: getPrice(),
      experienceId: uuid(),
      guestCount: randomNumber(1, 20),
    };
    addNewEntry(experience.city, 'experiences', experience)
      .then(response => console.log('success', response)) // eslint-disable-line
      .catch(err => console.error('errr', err)); // eslint-disable-line
  }
};

populateExperiences(1000);
