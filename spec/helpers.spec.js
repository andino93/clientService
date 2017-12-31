import { expect, assert } from 'chai';
import { config } from 'dotenv';
import "babel-polyfill"; // for async/await compiling
import addExperience from '../helpers/addExperience';
import { populateHomes, populateExperiences, makeSampleData } from '../helpers/generateData';
import getUrl from '../helpers/details';

config();

describe('Helper Functions', () => {
  describe('Add Experience', () => {
    it('addExperience should be a function', () => {
      expect(addExperience).to.be.a('function');
    });
    it('addExperience should not add experiences key when passed false', async () => {
      const query = { hits: 'this is a test response object containing homes' };
      const addExp = await addExperience(query, false, 'Chicago');
      expect(addExp).to.not.have.property('experiences');
    });
    it('addExperience should add experiences key with array of experince objs value if passed in true',
      async () => {
        const query = { hits: 'this is a test response object containing homes' };
        const addExp = await addExperience(query, true, 'Chicago');
        expect(addExp.experiences.hits).to.be.an('array');
        expect(addExp.experiences.hits[0]).to.be.an('object');
        expect(addExp.experiences.hits[0]._source.city).to.equal('Chicago');
    });
  });
  describe('generateData should make fake data', () => {
    // TODO: determine tests for sample data
    describe('makeSampleData', () => {
      const sample = makeSampleData(1, 'homes', 'home', 'homeId', false);
      it('sample data should be an array of objects', () => {
        expect(sample).to.be.an('array');
        expect(sample[0]).to.be.an('object');
      });
      it('sample data should resemble real data', () => {
        expect(sample[0]).to.have.property('title');
        expect(sample[0]).to.have.property('description');
        expect(sample[0]).to.have.property('datesAvailable');
        expect(sample[0]).to.have.property('city');
        expect(sample[0]).to.have.property('suburb');
        expect(sample[0]).to.have.property('price');
        expect(sample[0]).to.have.property('homeId');
        expect(sample[0]).to.have.property('guestCount');
      });
    });
    describe('populateHomes', () => {
      it('should insert homes into database', async () => {
        const response = await populateHomes(10);
        expect(response).to.be.an('object');
        expect(response.items[0].index._index).to.equal('homes');
        expect(response.items[0].index._type).to.equal('home');
        expect(response.items[0].index.result).to.equal('created');
      });
    });
    describe('populateExperiences', () => {
      it('should insert experiences into database', async () => {
        const response = await populateExperiences(10);
        expect(response).to.be.an('object');
        expect(response.items[0].index._index).to.equal('experiences');
        expect(response.items[0].index._type).to.equal('experience');
        expect(response.items[0].index.result).to.equal('created');
      });
    });
  });
  describe('getUrl should return endpoint based on input', () => {
    it('should return experiences url', () => {
      const url = getUrl('experience');
      expect(url).to.equal(process.env.EXPERIENCES);
    });
    it('should return home url', () => {
      const url = getUrl('home');
      expect(url).to.equal(process.env.HOMES);
    });
    it('should return test url when no match', () => {
      const url = getUrl('test');
      expect(url).to.equal(process.env.INVENTORY);
    });
  });
});
