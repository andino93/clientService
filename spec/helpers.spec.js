import { expect, assert } from 'chai';
import { config } from 'dotenv';
import "babel-polyfill"; // for async/await compiling
import addExperience from '../helpers/addExperience';
import generateData from '../helpers/generateData';
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
  xdescribe('generateData should make fake data', () => {
    // TODO: determine tests for sample data

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
