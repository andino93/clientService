import faker from 'faker';
import _ from 'lodash';
import uuid from 'uuid/v4';
import { bulkInsert } from './index';
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
const makeSampleData = (quantity, index, type, idType) => {
  const datas = [];
  for (let i = 0; i < quantity; i += 1) {
    const data = {
      title: faker.fake('{{random.words}}'),
      description: faker.fake('{{lorem.sentences}}'),
      datesAvailable: fakeDates(),
      city: cities[randomNumber(0, cities.length - 1)],
      suburb: neighborhoods[randomNumber(0, neighborhoods.length - 1)],
      price: getPrice(),
      [idType]: uuid(),
      guestCount: randomNumber(1, 6),
    };
    const indexInfo = { index: { _index: index, _type: type, _id: uuid() } };
    datas.push(indexInfo);
    datas.push(data);
  }
  return datas;
};

const populateHomes = (quantity) => {
  bulkInsert({ body: makeSampleData(quantity, 'homes', 'home', 'homeId') })
    .then(success => console.log(`inserted ${quantity} homes ${success}`))
    .catch(err => console.error(`error on homes ${err}`));
};

// populateHomes(10000);

const populateExperiences = (quantity) => {
  bulkInsert({ body: makeSampleData(quantity, 'experiences', 'experience', 'experienceId') })
    .then(success => console.log(`inserted ${quantity} experiences ${success}`))
    .catch(err => console.error(`error on exp ${err}`));
};

// populateExperiences(10000);

export { populateHomes, populateExperiences, makeSampleData };
