import faker from 'faker';
import _ from 'lodash';
import uuid from 'uuid/v4';
import { addNewEntry, bulkInsert } from './index';
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
    const indexInfo = { index: { _index: 'homes', _type: 'home', _id: uuid() } };
    homes.push(indexInfo);
    homes.push(home);
  }
  bulkInsert({ body: homes })
    .then(success => console.log(`inserted ${quantity} homes ${success}`))
    .catch(err => console.error(`error on homes ${err}`));
};

populateHomes(10000);

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
    const indexInfo = { index: { _index: 'experiences', _type: 'experience', _id: uuid() } };
    experiences.push(indexInfo);
    experiences.push(experience);
  }
  bulkInsert({ body: experiences })
    .then(success => console.log(`inserted ${quantity} experiences ${success}`))
    .catch(err => console.error(`error on exp ${err}`));
};

populateExperiences(10000);
